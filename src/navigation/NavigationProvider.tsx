import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { pagesById, pagesByPath } from "@pages/index";

import { DEFAULT_PAGE_ID } from "./routes";
import type { PageDefinition, PageId } from "./types";

export interface NavigationContextValue {
  pageId: PageId;
  page: PageDefinition;
  navigate: (pageId: PageId) => void;
  isActive: (pageId: PageId) => boolean;
}

export const NavigationContext = createContext<NavigationContextValue | null>(
  null,
);

const appBasePath = normalizeBasePath(import.meta.env.BASE_URL);

function normalizeBasePath(base: string): string {
  if (!base || base === "/") {
    return "";
  }

  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function withBasePath(path: string): string {
  return appBasePath === "" ? path : `${appBasePath}${path}`;
}

function stripBasePath(pathname: string): string {
  if (appBasePath === "" || pathname === "") {
    return pathname || "/";
  }

  if (pathname === appBasePath) {
    return "/";
  }

  if (pathname.startsWith(`${appBasePath}/`)) {
    return pathname.slice(appBasePath.length);
  }

  return pathname;
}

function resolvePageIdFromPath(pathname: string): PageId {
  if (pathname === "/" || pathname === "") {
    return DEFAULT_PAGE_ID;
  }

  return pagesByPath[pathname]?.id ?? DEFAULT_PAGE_ID;
}

function syncBrowserPath(path: string, replace: boolean) {
  const targetPath = withBasePath(path);
  const current = `${window.location.pathname}${window.location.search}`;
  if (current === targetPath) {
    return;
  }

  if (replace) {
    window.history.replaceState(null, "", targetPath);
  } else {
    window.history.pushState(null, "", targetPath);
  }
}

function readInitialPage(): PageId {
  const pathname = stripBasePath(window.location.pathname);
  const pageId = resolvePageIdFromPath(pathname);
  const canonicalPath =
    pathname === "/" || pathname === ""
      ? pagesById[DEFAULT_PAGE_ID].path
      : (pagesByPath[pathname]?.path ?? pagesById[pageId].path);

  syncBrowserPath(canonicalPath, true);
  return pageId;
}

export interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [pageId, setPageId] = useState<PageId>(readInitialPage);

  const page = pagesById[pageId];

  const navigate = useCallback((nextPageId: PageId) => {
    const nextPage = pagesById[nextPageId];
    setPageId(nextPageId);
    syncBrowserPath(nextPage.path, false);
  }, []);

  const isActive = useCallback(
    (candidatePageId: PageId) => pageId === candidatePageId,
    [pageId],
  );

  useEffect(() => {
    const onPopState = () => {
      setPageId(resolvePageIdFromPath(stripBasePath(window.location.pathname)));
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      pageId,
      page,
      navigate,
      isActive,
    }),
    [pageId, page, navigate, isActive],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
