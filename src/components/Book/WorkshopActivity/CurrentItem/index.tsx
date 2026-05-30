import { useEffect, useState } from 'react';

import { Unplan } from '@game/events/Unplan';
import { useGameDispatch } from '@game/hooks/useGameDispatch';
import { useGameState } from '@game/hooks/useGameState';
import { gameLibrary } from '@game/library/gameLibrary';
import { formatRemainingTime, getSkillDurationMs } from '@game/library/skillDisplay';
import type { ProfessionId } from '@game/state/types';

import { TaskCard } from '../TaskCard';

export interface CurrentItemProps {
  professionId: ProfessionId;
}

export function CurrentItem({ professionId }: CurrentItemProps) {
  const dispatch = useGameDispatch();
  const profession = useGameState((state) => state.professions[professionId]);
  const currentTask = profession.currentTask;
  const headTask = profession.taskQueue[0];
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!currentTask) {
      return;
    }

    const skill = gameLibrary.skills[currentTask.skillId];
    if (!skill) return;

    const durationMs = getSkillDurationMs(skill);
    let animFrameId: number;

    const updateProgress = () => {
      setNow(Date.now());
      const elapsed = Date.now() - currentTask.startedAt;
      if (elapsed < durationMs) {
        animFrameId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    return () => cancelAnimationFrame(animFrameId);
  }, [currentTask]);

  if (currentTask === null || headTask === undefined) return null;

  const skill = gameLibrary.skills[currentTask.skillId];
  const item = gameLibrary.items[currentTask.skillId];
  const title = item?.name ?? currentTask.skillId;
  const count = headTask.skillId === currentTask.skillId ? headTask.count : 1;
  const durationMs = skill ? getSkillDurationMs(skill) : 1;
  const elapsed = now - currentTask.startedAt;
  const progress = Math.min(1, Math.max(0, elapsed / durationMs));
  const remainingLabel = formatRemainingTime(Math.max(0, durationMs - elapsed));

  return (
    <TaskCard
      className="current-item"
      title={title}
      count={count}
      progress={{ value: progress, label: remainingLabel }}
      {...(skill?.icon ? { iconSrc: skill.icon } : {})}
      onRemove={() => {
        dispatch(new Unplan(headTask.id));
      }}
    />
  );
}
