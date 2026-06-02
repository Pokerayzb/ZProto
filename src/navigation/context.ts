import { createContext } from 'react';

import type { PageDefinition, PageId } from '@pages/types';

export interface NavigationContextValue {
  pageId: PageId;
  page: PageDefinition;
  /** Active book tab from the last navigate() call, when provided. */
  tab: string | null;
  navigate: (pageId: PageId, tab?: string) => void;
  isActive: (pageId: PageId) => boolean;
}

export const NavigationContext = createContext<NavigationContextValue | null>(
  null,
);
