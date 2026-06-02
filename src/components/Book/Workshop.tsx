import { useMemo, useState } from 'react';
import { Book } from '@components/Book';
import { ProfessionSkillList } from '@components/Book/ProfessionSkillList';
import { WorkshopActivity } from '@components/Book/WorkshopActivity';
import { WorkshopCreation } from '@components/Book/WorkshopCreation';
import { ProgressBar } from '@components/ProgressBar';
import { ScrollArea } from '@components/ScrollArea';
import { gameLibrary } from '@game/library/gameLibrary';
import type { ProfessionType } from '@game/library/types';
import { getDefaultProfessionSkillId } from '@game/selectors/skills';
import { useGameState } from '@game/hooks/useGameState';
import type { ProfessionId } from '@game/state/types';

function ProfessionLevelHeader({ professionId }: { professionId: ProfessionId }) {
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

function WorkshopPanel({
  professionId,
  selectedSkillId,
  onSelectSkill,
}: {
  professionId: ProfessionId;
  selectedSkillId: string;
  onSelectSkill: (skillId: string) => void;
}) {
  const activeSkill = gameLibrary.skills[selectedSkillId];

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <ProfessionLevelHeader professionId={professionId} />
      <div className="flex h-full min-h-0 flex-1">
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ScrollArea className="min-h-0 flex-1">
            <ProfessionSkillList
              professionId={professionId}
              selectedSkillId={selectedSkillId}
              onSelect={onSelectSkill}
            />
          </ScrollArea>
        </section>
        <div className="w-px shrink-0 self-stretch bg-button-text" aria-hidden />
        <section className="flex min-h-0 min-w-0 flex-1 flex-col mx-3">
          {activeSkill ? <WorkshopCreation skill={activeSkill} /> : null}
        </section>
        <div className="w-px shrink-0 self-stretch bg-button-text" aria-hidden />
        <section className="flex min-h-0 min-w-0 flex-1 flex-col ml-3">
          <WorkshopActivity professionId={professionId} />
        </section>
      </div>
    </div>
  );
}

export interface WorkshopProps {
  name: string;
  professionType: ProfessionType;
}

export function Workshop({ name, professionType }: WorkshopProps) {
  const professionState = useGameState((state) => state.professions);
  const [selectedSkillIds, setSelectedSkillIds] = useState<Record<string, string>>({});

  const professions = useMemo(
    () => Object.values(gameLibrary.professions).filter((p) => p.type === professionType),
    [professionType],
  );

  const panels = useMemo(
    () =>
      professions.map((prof) => {
        const selectedSkillId =
          selectedSkillIds[prof.id] ??
          getDefaultProfessionSkillId(prof.id, professionState[prof.id], gameLibrary);

        return {
          id: prof.id,
          label: prof.workshop.title,
          content: (
            <WorkshopPanel
              professionId={prof.id}
              selectedSkillId={selectedSkillId}
              onSelectSkill={(skillId) => {
                setSelectedSkillIds((prev) => ({ ...prev, [prof.id]: skillId }));
              }}
            />
          ),
        };
      }),
    [professions, professionState, selectedSkillIds],
  );

  return <Book name={name} panels={panels} />;
}
