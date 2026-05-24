import { LevelBadge } from "@components/LevelBadge";

import avatarFrame from "./assets/big_butt_skill.png";
import type { CharacterPortraitProps } from "./types";

const prototypeCharacter: CharacterPortraitProps = {
  name: "Captain",
  status: "Ready",
  level: 1,
};

export function CharacterPortrait({
  name = prototypeCharacter.name,
  status = prototypeCharacter.status,
  level = prototypeCharacter.level,
}: Partial<CharacterPortraitProps> = {}) {
  return (
    <div className="flex items-center gap-3 text-button-text">
      <div className="relative shrink-0 overflow-visible">
        <div className="relative h-40">
          <div className="absolute bottom-0 right-0 z-2">
            <LevelBadge level={level} size="large" />
          </div>
          <img
            className="relative z-1 size-full object-contain pointer-events-none"
            src={avatarFrame}
            alt=""
            aria-hidden
            decoding="async"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="m-0 truncate">{name}</h2>
        <h3 className="m-0 truncate text-button-text/70">{status}</h3>
      </div>
    </div>
  );
}

export type { CharacterPortraitProps } from "./types";
