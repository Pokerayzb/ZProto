import { useNavigation } from '@navigation/useNavigation';

import { CharacterPortrait } from './CharacterPortrait';

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps = {}) {
  const { page } = useNavigation();

  const classes =
    'w-full bg-gradient-to-b from-button-bg to-transparent pb-8' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <div className="pointer-events-auto flex w-full items-center gap-4 px-6 pt-4">
        <div className="shrink-0">
          <CharacterPortrait />
        </div>
        <h1 className="m-0 min-w-0 flex-1 text-center whitespace-nowrap text-button-text">
          {page.title}
        </h1>
      </div>
    </div>
  );
}
