import { Button } from "@components/Button";

import "./index.css";

export type NavItemProps = {
  iconSrc: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
};

export function NavItem({ iconSrc, title, active = false, onClick }: NavItemProps) {
  return (
    <Button className="nav-button" active={active} onClick={onClick} type="button">
      <img
        className="icon"
        src={iconSrc}
        alt=""
        decoding="async"
      />
      <h2 className="title">{title}</h2>
    </Button>
  );
}
