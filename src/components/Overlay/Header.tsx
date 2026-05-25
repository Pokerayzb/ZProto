import { useNavigation } from '@navigation/useNavigation';

import { CharacterPortrait } from './CharacterPortrait';

export function Header() {
  const { page } = useNavigation();

  return (
    <div className="w-full bg-gradient-to-b from-button-bg to-transparent pb-8">
      <div className="flex w-full items-center gap-4 px-6 pt-4">
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
