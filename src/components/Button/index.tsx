import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { Layout } from '@components/shared';

import './index.css';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  active?: boolean;
  layout?: Layout;
}

export function Button({
  children,
  active = false,
  layout = 'horizontal',
  className,
  ...rest
}: ButtonProps) {
  const classes =
    'button ' +
    layout +
    (active ? ' active' : '') +
    (className ? ' ' + className : '');

  return (
    <button className={classes} type="button" {...rest}>
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
    </button>
  );
}
