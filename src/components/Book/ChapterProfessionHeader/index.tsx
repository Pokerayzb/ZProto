import { ProgressBar } from '@components/ProgressBar';
import { useGameState } from '@game/hooks/useGameState';
import type { ProfessionId } from '@game/state/types';

export interface ChapterProfessionHeaderProps {
  professionId: ProfessionId;
}

export function ChapterProfessionHeader({ professionId }: ChapterProfessionHeaderProps) {
  const profession = useGameState((state) => state.professions[professionId]);
  const level = profession.level;
  const progressValue = level.target > 0 ? level.progress / level.target : 0;

  return (
    <header className="flex justify-center border-b border-border-muted pb-3">
      <div className="flex w-full max-w-lg items-center gap-4">
        <span className="shrink-0 whitespace-nowrap font-serif text-lg font-bold">
          Level: {level.value}
        </span>
        <ProgressBar
          value={progressValue}
          size="large"
          className="min-w-0 flex-1"
          label={`XP ${level.progress} / ${level.target}`}
        />
      </div>
    </header>
  );
}
