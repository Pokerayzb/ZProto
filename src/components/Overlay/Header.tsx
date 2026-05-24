import { useNavigation } from "@navigation/useNavigation";

import { CharacterPortrait } from "./CharacterPortrait";

export function Header() {
  const { page } = useNavigation();

  return (
    <div className="w-full bg-gradient-to-b from-button-bg to-transparent pb-8">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 pt-4">
        <div className="justify-self-start">
          <CharacterPortrait />
        </div>
        <h1 className="max-w-full justify-self-center text-center text-button-text">
          {page.title}
        </h1>
        <div className="justify-self-end" />
      </div>
    </div>
  );
}
