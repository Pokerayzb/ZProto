import type { ReactNode } from 'react';

import './index.css';

export interface BookProps {
  children?: ReactNode;
  className?: string;
}

export function Book({ children, className }: BookProps) {
  const classes = 'book' + (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <div className="page">
        <div className="inner">{children}</div>
      </div>
    </div>
  );
}
