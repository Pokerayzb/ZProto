import { useEffect } from 'react';

import { Tick } from '@game/events/Tick';
import { Unplan } from '@game/events/Unplan';
import { useGameDispatch } from '@game/hooks/useGameDispatch';
import { useGameState } from '@game/hooks/useGameState';
import { gameLibrary } from '@game/library/gameLibrary';
import { getSkillDurationMs } from '@game/library/skillDisplay';
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

  if (currentTask === null || headTask === undefined) return null;

  const skill = gameLibrary.skills[currentTask.skillId];
  const item = gameLibrary.items[currentTask.skillId];
  const title = item?.name ?? currentTask.skillId;
  const count = headTask.skillId === currentTask.skillId ? headTask.count : 1;
  const durationMs = skill ? getSkillDurationMs(skill) : 1;

  useEffect(() => {
    if (!skill) {
      return;
    }

    const completeAt = currentTask.startedAt + durationMs;
    const timeoutMs = Math.max(0, completeAt - Date.now()) + 1;
    const timeoutId = window.setTimeout(() => {
      dispatch(new Tick(Date.now()));
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentTask.startedAt, durationMs, dispatch, skill]);

  if (!skill) {
    return null;
  }

  return (
    <TaskCard
      className="current-item"
      title={title}
      count={count}
      progress={{
        startedAt: currentTask.startedAt,
        totalMs: durationMs,
      }}
      {...(skill?.icon ? { iconSrc: skill.icon } : {})}
      onRemove={() => {
        dispatch(new Unplan(headTask.id));
      }}
    />
  );
}
