import { pagesById } from '@pages/index';
import type { PageDefinition, PageId } from '@pages/types';

/** Bottom navigation entries — add new page ids here explicitly. */
export const NAV_BAR_PAGE_IDS = [
  "tower",
  "gathering",
  "craft",
  "inventory",
  "zeppelins",
  "reputation",
] as const satisfies readonly PageId[];

export const navBarPages: PageDefinition[] = NAV_BAR_PAGE_IDS.map(
  (id) => pagesById[id],
);
