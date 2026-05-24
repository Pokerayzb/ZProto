import { pages, pagesById, pagesByPath } from "@pages/index";
import type { PageDefinition, PageId } from "@pages/types";

export const DEFAULT_PAGE_ID: PageId = "tower";

export const routes = pages;

export const routesById = pagesById;

export const routesByPath = pagesByPath;

export type RouteDefinition = PageDefinition;
export type RouteId = PageId;

/** @deprecated Use DEFAULT_PAGE_ID */
export const DEFAULT_ROUTE_ID = DEFAULT_PAGE_ID;
