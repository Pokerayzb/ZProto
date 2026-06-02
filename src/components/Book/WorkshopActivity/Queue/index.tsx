import { ScrollArea } from '@components/ScrollArea';
import { useGameState } from '@game/hooks/useGameState';
import { gameLibrary } from '@game/library/gameLibrary';
import type { ProfessionId } from '@game/state/types';
import { Unplan } from '@game/events/Unplan';
import { useGameDispatch } from '@game/hooks/useGameDispatch';

import { CurrentItem } from '../CurrentItem';
import { TaskCard } from '../TaskCard';

export interface QueueProps {
  professionId: ProfessionId;
}

export function Queue({ professionId }: QueueProps) {
  const dispatch = useGameDispatch();
  const profession = useGameState((state) => state.professions[professionId]);
  const { currentTask, taskQueue } = profession;
  const queuedItems = currentTask !== null ? taskQueue.slice(1) : taskQueue;
  const isEmpty = currentTask === null && queuedItems.length === 0;

  return (
    <div className="queue flex min-h-0 flex-1 flex-col">
      <h2 className="mb-2 shrink-0 text-center">Queue</h2>
      {isEmpty ? (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <h2 className="text-center text-page-text/40">Queue is empty</h2>
        </div>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          {currentTask !== null ? <CurrentItem professionId={professionId} /> : null}
          {queuedItems.map((task) => {
            const skill = gameLibrary.skills[task.skillId];
            const item = gameLibrary.items[task.skillId];
            const title = item?.name ?? task.skillId;

            return (
              <TaskCard
                key={task.id}
                className="queue-item"
                title={title}
                count={task.count}
                {...(skill?.icon ? { iconSrc: skill.icon } : {})}
                onRemove={() => {
                  dispatch(new Unplan(task.id));
                }}
              />
            );
          })}
        </ScrollArea>
      )}
    </div>
  );
}
