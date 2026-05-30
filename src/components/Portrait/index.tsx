import type { ReactNode } from 'react';

import avatarFrame from './assets/big_butt_skill.png';

import './index.css';

export interface PortraitProps {
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
  children?: ReactNode;
}

export function Portrait({
  iconSrc,
  iconAlt = '',
  className,
  children,
}: PortraitProps) {
  const classes =
    'portrait relative shrink-0 overflow-visible' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <div className="relative aspect-square size-full">
        <img
          className="pointer-events-none size-full object-contain"
          src={avatarFrame}
          alt=""
          aria-hidden
          decoding="async"
        />
        {iconSrc ? (
          <div className="portrait-icon-wrap">
            <img
              className="block size-full object-cover object-center"
              src={iconSrc}
              alt={iconAlt}
              decoding="async"
            />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
