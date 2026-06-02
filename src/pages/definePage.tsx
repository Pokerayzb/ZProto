import { Page } from '@components/Page';

import type { DefinePageOptions, PageDefinition } from './types';

export function definePage({
  id,
  path,
  title,
  icon,
  background,
  transparentBackground,
  children,
}: DefinePageOptions): PageDefinition {
  function Component() {
    return (
      <Page
        background={background}
        {...(transparentBackground !== undefined ? { transparentBackground } : {})}
      >
        {children}
      </Page>
    );
  }

  return {
    id,
    path,
    title,
    icon,
    background,
    Component,
  };
}
