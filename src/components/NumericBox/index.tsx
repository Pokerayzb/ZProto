import type { ChangeEvent, HTMLAttributes } from 'react';

import './index.css';

const PRESETS = [1, 5, 10] as const;

export interface NumericBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  max: number;
  min?: number;
  className?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function NumericBox({
  value,
  onChange,
  max,
  min = 1,
  className,
  ...props
}: NumericBoxProps) {
  const effectiveMax = Math.max(min, max);
  const currentValue = clamp(value, min, effectiveMax);
  const classes = 'numeric-box flex min-w-0 flex-col gap-2' + (className ? ' ' + className : '');

  function setValue(next: number) {
    onChange(clamp(next, min, effectiveMax));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const parsed = Number.parseInt(event.target.value, 10);
    if (Number.isNaN(parsed)) return;
    setValue(parsed);
  }

  return (
    <div className={classes} {...props}>
      <div className="stepper grid grid-cols-[auto_minmax(0,1fr)_auto] items-stretch gap-1.5">
        <button
          type="button"
          className="step control-surface flex aspect-square h-full w-auto items-center justify-center p-0 text-lg font-bold leading-none disabled:opacity-disabled disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
          disabled={currentValue <= min}
          onClick={() => setValue(currentValue - 1)}
        >
          −
        </button>
        <input
          type="number"
          className="value control-surface box-border min-w-0 px-2 py-1.5 text-center text-lg font-bold tabular-nums"
          value={currentValue}
          min={min}
          max={effectiveMax}
          aria-label="Quantity"
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="step control-surface flex aspect-square h-full w-auto items-center justify-center p-0 text-lg font-bold leading-none disabled:opacity-disabled disabled:cursor-not-allowed"
          aria-label="Increase quantity"
          disabled={currentValue >= effectiveMax}
          onClick={() => setValue(currentValue + 1)}
        >
          +
        </button>
      </div>
      <div className="presets grid grid-cols-4 gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={
              'preset control-surface min-w-0 px-1 py-1.5 text-xs font-bold uppercase tracking-wide disabled:opacity-disabled disabled:cursor-not-allowed' +
              (currentValue === preset ? ' active' : '')
            }
            disabled={preset > effectiveMax}
            onClick={() => setValue(preset)}
          >
            {preset}
          </button>
        ))}
        <button
          type="button"
          className={
            'preset control-surface min-w-0 px-1 py-1.5 text-xs font-bold uppercase tracking-wide disabled:opacity-disabled disabled:cursor-not-allowed' +
            (currentValue === effectiveMax ? ' active' : '')
          }
          disabled={effectiveMax < min}
          onClick={() => setValue(effectiveMax)}
        >
          MAX
        </button>
      </div>
    </div>
  );
}
