import type { ReactNode } from 'react';

export type PageProps = {
  background: string;
  children?: ReactNode;
  className?: string;
};

export function Page({ background, children, className }: PageProps) {
  const classes =
    'relative min-h-dvh w-full overflow-hidden' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <img
          className="pointer-events-none absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none"
          src={background}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="relative z-[1] min-h-dvh w-full">{children}</div>
    </div>
  );
}
