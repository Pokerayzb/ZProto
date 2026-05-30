import { createContext } from 'react';

import type { PageDefinition, PageId } from '@pages/types';

import type { NavigateOptions } from './types';

export interface NavigationContextValue {
  pageId: PageId;
  page: PageDefinition;
  pageOptions: NavigateOptions | null;
  navigate: (pageId: PageId, options?: NavigateOptions) => void;
  isActive: (pageId: PageId) => boolean;
}

export const NavigationContext = createContext<NavigationContextValue | null>(
  null,
);
