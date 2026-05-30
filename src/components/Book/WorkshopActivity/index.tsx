import type { ProfessionId } from '@game/state/types';

import { Queue } from './Queue';
import { Upgrades } from './Upgrades';

export interface WorkshopActivityProps {
  professionId: ProfessionId;
}

export function WorkshopActivity({ professionId }: WorkshopActivityProps) {
  return (
    <div className="workshop-activity flex h-full min-h-0 flex-col gap-4 py-1">
      <Queue professionId={professionId} />
      <Upgrades />
    </div>
  );
}
