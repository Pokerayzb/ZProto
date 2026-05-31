import { Panel } from '@components/Panel';
import { navBarPages } from '@navigation/navBar';
import { useNavigation } from '@navigation/useNavigation';

import { Header } from './Header';
import { NavItem } from './NavItem';

export interface OverlayProps {
  className?: string;
}

export function Overlay({ className }: OverlayProps = {}) {
  const { navigate, isActive } = useNavigation();

  const classes =
    'pointer-events-none fixed inset-0 z-10 flex flex-col justify-between' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <header className="pointer-events-none w-full">
        <Header />
      </header>

      <footer className="pointer-events-none flex items-end justify-center px-6 py-4">
        <div className="pointer-events-auto origin-bottom scale-60">
          <Panel layout="horizontal">
            {navBarPages.map((page) => (
              <NavItem
                key={page.id}
                icon={page.icon}
                title={page.title}
                active={isActive(page.id)}
                onClick={() => {
                  navigate(page.id);
                }}
              />
            ))}
          </Panel>
        </div>
      </footer>
    </div>
  );
}
