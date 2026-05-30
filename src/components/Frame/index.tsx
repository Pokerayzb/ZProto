import type { HTMLAttributes, ReactNode } from 'react';

import './index.css';

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Frame({ children, className, contentClassName, ...props }: FrameProps) {
  const classes = 'frame relative min-w-0' + (className ? ' ' + className : '');
  const contentClasses = 'content min-w-0' + (contentClassName ? ' ' + contentClassName : '');

  return (
    <div className={classes} {...props}>
      <span className="corner top-left" aria-hidden />
      <span className="corner top-right" aria-hidden />
      <span className="corner bottom-left" aria-hidden />
      <span className="corner bottom-right" aria-hidden />
      <span className="edge top" aria-hidden />
      <span className="edge right" aria-hidden />
      <span className="edge bottom" aria-hidden />
      <span className="edge left" aria-hidden />
      <div className={contentClasses}>{children}</div>
    </div>
  );
}
