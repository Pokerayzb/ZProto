import type { ReactNode } from 'react';

import type { Layout, Size } from '@components/shared';

import './index.css';

export interface ProgressBarProps {
  value: number;
  size?: Size;
  layout?: Layout;
  label?: ReactNode;
  className?: string;
}

const sizeClasses: Record<
  Size,
  {
    horizontal: string;
    vertical: string;
    grooveHorizontal: string;
    grooveVertical: string;
    label: string;
  }
> = {
  small: {
    horizontal: 'h-progress-bar-sm min-h-progress-bar-sm',
    vertical: 'w-progress-bar-sm min-w-progress-bar-sm',
    grooveHorizontal: 'inset-x-0.5 inset-y-px',
    grooveVertical: 'inset-x-px inset-y-0.5',
    label: 'px-2 py-0.5 text-[0.625rem] leading-none',
  },
  normal: {
    horizontal: 'h-progress-bar-md min-h-progress-bar-md',
    vertical: 'w-progress-bar-md min-w-progress-bar-md',
    grooveHorizontal: 'inset-x-[3px] inset-y-0.5',
    grooveVertical: 'inset-x-0.5 inset-y-[3px]',
    label: 'px-3.5 py-1.5 text-xs leading-none',
  },
  large: {
    horizontal: 'h-progress-bar-lg min-h-progress-bar-lg',
    vertical: 'w-progress-bar-lg min-w-progress-bar-lg',
    grooveHorizontal: 'inset-x-1 inset-y-[3px]',
    grooveVertical: 'inset-x-[3px] inset-y-1',
    label: 'px-4 py-1.5 text-sm leading-none',
  },
};

function clampProgress(value: number) {
  if (value < 0) {
    return 0;
  }

  if (value > 1) {
    return 1;
  }

  return value;
}

export function ProgressBar({
  value,
  size = 'normal',
  layout = 'horizontal',
  label,
  className,
}: ProgressBarProps) {
  const progress = clampProgress(value);
  const classes = sizeClasses[size];
  const dimension =
    layout === 'horizontal' ? classes.horizontal : classes.vertical;
  const grooveInset =
    layout === 'horizontal'
      ? classes.grooveHorizontal
      : classes.grooveVertical;
  const progressPercent = String(progress * 100);
  const fillStyle =
    layout === 'horizontal'
      ? { width: `${progressPercent}%` }
      : { height: `${progressPercent}%` };
  const fillPosition =
    layout === 'horizontal'
      ? 'top-0 left-0 h-full'
      : 'right-0 bottom-0 left-0';
  const rootClasses =
    'progressbar relative isolate grid min-h-0 min-w-0 place-items-center overflow-hidden rounded-full ' +
    layout +
    ' ' +
    size +
    ' ' +
    dimension +
    (layout === 'horizontal' ? ' w-full' : ' h-full') +
    (className ? ' ' + className : '');

  return (
    <div
      className={rootClasses}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="track absolute inset-0 overflow-hidden rounded-[inherit]"
        aria-hidden
      >
        <div
          className={
            'groove absolute overflow-hidden rounded-[inherit] ' + grooveInset
          }
        >
          <div
            className={
              'fill absolute overflow-hidden rounded-[inherit] transition-[width,height] duration-200 ease-out ' +
              fillPosition
            }
            style={fillStyle}
          />
        </div>
      </div>
      {label !== undefined ? (
        <div
          className={
            'label relative z-1 box-border w-full text-center font-bold whitespace-nowrap text-label-parchment ' +
            classes.label
          }
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
