import type { ReactNode } from 'react';

export type PageProps = {
  background: string;
  /** Skip the DOM background image so the Pixi world shows through. */
  transparentBackground?: boolean;
  children?: ReactNode;
  className?: string;
};

export function Page({ background, transparentBackground, children, className }: PageProps) {
  const classes =
    'relative min-h-dvh w-full overflow-hidden' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      {!transparentBackground && (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <img
            className="pointer-events-none absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none"
            src={background}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        </div>
      )}
      <div
        className={
          'relative z-[1] min-h-dvh w-full ' +
          (transparentBackground ? 'pointer-events-none' : 'pointer-events-auto')
        }
      >
        {children}
      </div>
    </div>
  );
}
