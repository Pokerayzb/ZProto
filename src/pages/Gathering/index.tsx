import { useState } from 'react';
import { Book } from '@components/Book';
import { Chapter } from '@components/Book/Chapter';
import { WorkshopCreation } from '@components/Book/WorkshopCreation';
import { Column } from '@components/Book/Column';
import { ProfessionSkillList } from '@components/Book/ProfessionSkillList';
import { ScrollArea } from '@components/ScrollArea';
import { WorkshopActivity } from '@components/Book/WorkshopActivity';

import { gameLibrary } from '@game/library/gameLibrary';
import { getDefaultProfessionSkillId } from '@game/selectors/skills';
import { useGameState } from '@game/hooks/useGameState';
import { definePage } from '../definePage';

import background from './assets/background.png';
import icon from './assets/icon.png';

const gatheringProfessions = Object.values(gameLibrary.professions)
  .filter((p) => p.type === 'gathering');

export function GatheringComponent() {
  const professions = useGameState((state) => state.professions);

  const [selectedSkillIds, setSelectedSkillIds] = useState<Record<string, string>>({});

  return (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <Book name="Gathering" className="min-h-0 flex-1">
        {gatheringProfessions.map((prof) => {
          const defaultSelId = getDefaultProfessionSkillId(prof.id, professions[prof.id], gameLibrary);
          const selId = selectedSkillIds[prof.id] ?? defaultSelId;
          const activeSkill = gameLibrary.skills[selId];

          return (
            <Chapter
              key={prof.id}
              id={prof.id}
              label={prof.workshop.title}
              professionId={prof.id}
            >
              <Column>
                <ScrollArea>
                  <ProfessionSkillList
                    professionId={prof.id}
                    selectedSkillId={selId}
                    onSelect={(skillId) => {
                      setSelectedSkillIds((prev) => ({
                        ...prev,
                        [prof.id]: skillId,
                      }));
                    }}
                  />
                </ScrollArea>
              </Column>

              <Column className="h-full">
                {activeSkill ? <WorkshopCreation skill={activeSkill} /> : null}
              </Column>

              <Column>
                <WorkshopActivity professionId={prof.id} />
              </Column>
            </Chapter>
          );
        })}
      </Book>
    </div>
  );
}

export const gatheringPage = definePage({
  id: "gathering",
  path: "/gathering",
  title: "Gathering",
  icon,
  background,
  children: <GatheringComponent />,
});
