import type { ReactNode } from 'react';

export interface ColumnProps {
  children?: ReactNode;
  className?: string;
}

export function Column({ children, className }: ColumnProps) {
  const classes =
    'flex min-h-0 min-w-0 flex-col px-4 first:pl-0 last:pr-0' +
    (className ? ' ' + className : '');

  return <section className={classes}>{children}</section>;
}
