import type { ReactNode } from 'react';

import type { Layout } from '@components/shared';

import './index.css';

export interface PanelProps {
  children: ReactNode;
  layout?: Layout;
  className?: string;
}

export function Panel({
  children,
  layout = 'horizontal',
  className,
}: PanelProps) {
  const classes = 'panel ' + layout + (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <span className="tl" aria-hidden />
      <span className="t" aria-hidden />
      <span className="tr" aria-hidden />
      <span className="l" aria-hidden />
      <div className="content">
        <div className="background" />
        <div className="inner">{children}</div>
      </div>
      <span className="r" aria-hidden />
      <span className="bl" aria-hidden />
      <span className="b" aria-hidden />
      <span className="br" aria-hidden />
    </div>
  );
}
