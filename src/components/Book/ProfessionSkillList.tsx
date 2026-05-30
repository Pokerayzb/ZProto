import { Recipe } from '@components/Book/Recipe';
import { useProfessionSkillEntries } from '@game/hooks/useProfessionSkillEntries';
import type { ProfessionId } from '@game/state/types';

export interface ProfessionSkillListProps {
  professionId: ProfessionId;
  selectedSkillId: string;
  onSelect: (skillId: string) => void;
}

export function ProfessionSkillList({
  professionId,
  selectedSkillId,
  onSelect,
}: ProfessionSkillListProps) {
  const skillEntries = useProfessionSkillEntries(professionId);

  return (
    <div className="book-scroll-list">
      {skillEntries.map(({ skill }) => (
        <Recipe
          key={skill.id}
          skill={skill}
          selected={skill.id === selectedSkillId}
          onSelect={() => {
            onSelect(skill.id);
          }}
        />
      ))}
    </div>
  );
}
