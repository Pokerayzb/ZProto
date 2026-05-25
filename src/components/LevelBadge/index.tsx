import type { LevelProgress } from '@game/state/types';

import levelBadgeBg from './dot_des.png';

export type LevelBadgeSize = "normal" | "large";

export interface LevelBadgeProps {
  level: LevelProgress;
  size?: LevelBadgeSize;
}

const sizeClasses: Record<
  LevelBadgeSize,
  { container: string; label: string }
> = {
  normal: {
    container: "size-10",
    label: "text-sm font-semibold",
  },
  large: {
    container: "size-12",
    label: "text-xl font-semibold",
  },
};

export function LevelBadge({ level, size = "normal" }: LevelBadgeProps) {
  const classes = sizeClasses[size];

  return (
    <div
      className={`relative grid place-items-center text-button-text ${classes.container}`}
      aria-label={`Level ${level.value}`}
    >
      <img
        className="pointer-events-none col-start-1 row-start-1 size-full object-contain"
        src={levelBadgeBg}
        alt=""
        aria-hidden
        decoding="async"
      />
      <h2
        className={`z-10 col-start-1 row-start-1 text-center leading-none ${classes.label} -mt-1`}
      >
        {level.value}
      </h2>
    </div>
  );
}
