import { useContext } from 'react';

import {
  NavigationContext,
  type NavigationContextValue,
} from './context';

export type { NavigationContextValue };

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);

  if (context === null) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }

  return context;
}
