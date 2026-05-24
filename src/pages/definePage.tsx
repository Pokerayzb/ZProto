import { Page } from "@components/Page";

import type { DefinePageOptions, PageDefinition } from "./types";

export function definePage({
  id,
  path,
  title,
  iconSrc,
  children,
}: DefinePageOptions): PageDefinition {
  function Component() {
    return <Page>{children}</Page>;
  }

  return {
    id,
    path,
    title,
    iconSrc,
    Component,
  };
}
