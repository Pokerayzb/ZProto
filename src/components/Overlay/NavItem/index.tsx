import { Button } from "@components/Button";

export type NavItemProps = {
  icon: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
};

export function NavItem({ icon, title, active = false, onClick }: NavItemProps) {
  return (
    <Button
      layout="vertical"
      active={active}
      onClick={onClick}
    >
      <img
        className="block size-icon shrink-0 object-contain"
        src={icon}
        alt=""
        decoding="async"
      />
      <h2 className="block overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>
    </Button>
  );
}
