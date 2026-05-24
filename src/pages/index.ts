import { craftPage } from "./Craft";
import { gatheringPage } from "./Gathering";
import { inventoryPage } from "./Inventory";
import { reputationPage } from "./Reputation";
import { towerPage } from "./Tower";
import { zeppelinsPage } from "./Zeppelins";
import type { PageDefinition, PageId } from "./types";

export const pages: PageDefinition[] = [
  towerPage,
  gatheringPage,
  craftPage,
  inventoryPage,
  zeppelinsPage,
  reputationPage,
];

export const pagesById = Object.fromEntries(
  pages.map((page) => [page.id, page]),
) as Record<PageId, PageDefinition>;

export const pagesByPath = Object.fromEntries(
  pages.map((page) => [page.path, page]),
) as Record<string, PageDefinition>;

export type { PageDefinition, PageId } from "./types";
export { definePage } from "./definePage";
