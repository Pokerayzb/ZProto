import type { Size } from '@components/shared';

import { coinIcon, experienceIcon, reputationIcon, resourceIcons } from './icons';

const sizeClasses: Record<
  Size,
  { icon: string; text: string; gap: string }
> = {
  small: {
    icon: 'size-3.5',
    text: 'text-xs',
    gap: 'gap-1',
  },
  normal: {
    icon: 'size-4',
    text: 'text-sm',
    gap: 'gap-1.5',
  },
  large: {
    icon: 'size-5',
    text: 'text-base',
    gap: 'gap-2',
  },
};

function formatValue(value: number | string): string {
  if (typeof value === 'number') {
    return value.toLocaleString('en-US').replace(/,/g, '\u00A0');
  }
  return String(value);
}

/** Locale-formatted resource amount for HUD displays. */
export function formatResourceValue(value: number | string): string {
  return formatValue(value);
}

export interface ValueBadgeProps {
  /** Icon URL for the resource (coin, reputation, experience, etc.). */
  icon: string;
  value: number | string;
  /** Accessible resource name, e.g. "Gold" or "Reputation". */
  label?: string;
  /** Text shown before the value, e.g. "+". */
  prefix?: string;
  size?: Size;
  className?: string;
}

/** Icon + value pair for coins, reputation, experience, and other resources. */
export function ValueBadge({
  icon,
  value,
  label,
  prefix,
  size = 'small',
  className,
}: ValueBadgeProps) {
  const sizes = sizeClasses[size];
  const formatted = formatValue(value);
  const display = `${prefix ?? ''}${formatted}`;
  const ariaLabel = label ? `${label}: ${display}` : undefined;

  return (
    <span
      className={`inline-flex items-center font-mono font-bold tabular-nums ${sizes.gap} ${sizes.text}${className ? ' ' + className : ''}`}
      {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
    >
      <img
        src={icon}
        alt=""
        className={`${sizes.icon} shrink-0 object-contain`}
        aria-hidden
        decoding="async"
      />
      {display}
    </span>
  );
}

export { coinIcon, experienceIcon, reputationIcon, resourceIcons };
