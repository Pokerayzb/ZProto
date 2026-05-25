import { useNavigation } from '@navigation/useNavigation';

export function PageOutlet() {
  const { page } = useNavigation();
  const { Component } = page;

  return <Component />;
}
