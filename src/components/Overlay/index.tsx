import { Panel } from '@components/Panel';
import { navBarPages } from '@navigation/navBar';
import { useNavigation } from '@navigation/useNavigation';

import { Header } from './Header';
import { NavItem } from './NavItem';

export function Overlay() {
  const { navigate, isActive } = useNavigation();

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between">
      <header className="pointer-events-none w-full">
        <div className="pointer-events-auto w-full">
          <Header />
        </div>
      </header>

      <footer className="pointer-events-none flex items-end justify-center px-6 py-4">
        <div className="pointer-events-auto">
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
