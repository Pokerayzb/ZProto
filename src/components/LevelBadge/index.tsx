import type { Size } from '@components/shared';
import type { LevelProgress } from '@game/state/types';

import levelBadgeBg from './dot_des.png';

export interface LevelBadgeProps {
  level: LevelProgress;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, { container: string; label: string }> = {
  small: {
    container: 'size-8',
    label: 'text-xs font-semibold',
  },
  normal: {
    container: 'size-10',
    label: 'text-sm font-semibold',
  },
  large: {
    container: 'size-12',
    label: 'text-xl font-semibold',
  },
};

export function LevelBadge({
  level,
  size = 'normal',
  className,
}: LevelBadgeProps) {
  const classes = sizeClasses[size];

  return (
    <div
      className={`relative grid place-items-center text-button-text ${classes.container}${className ? ' ' + className : ''}`}
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
