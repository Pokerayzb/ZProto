import { Panel } from "@components/Panel";
import { navBarPages } from "@navigation/navBar";
import { useNavigation } from "@navigation/useNavigation";

import { NavItem } from "./NavItem";
import "./index.css";

export function Overlay() {
  const { navigate, isActive } = useNavigation();

  return (
    <div className="overlay">
      <header className="header">
        <div className="inner">
          <div className="placeholder" aria-hidden />
        </div>
      </header>

      <footer className="footer">
        <div className="inner">
          <Panel layout="horizontal" className="nav">
            {navBarPages.map((page) => (
              <NavItem
                key={page.id}
                iconSrc={page.iconSrc}
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
