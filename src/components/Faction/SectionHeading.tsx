import type { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 shrink-0 text-center font-serif text-xl font-bold tracking-wide text-page-text/80">
      {children}
    </h3>
  );
}
