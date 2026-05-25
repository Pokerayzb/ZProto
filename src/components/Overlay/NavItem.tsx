import { Button } from '@components/Button';

export interface NavItemProps {
  icon: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, title, active = false, onClick }: NavItemProps) {
  return (
    <Button layout="vertical" active={active} onClick={onClick}>
      <img
        className="block size-icon shrink-0 object-contain"
        src={icon}
        alt=""
        decoding="async"
      />
      <h2 className="m-0">{title}</h2>
    </Button>
  );
}
