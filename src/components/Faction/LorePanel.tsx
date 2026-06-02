import type { ReactNode } from 'react';

import { Frame } from '@components/Frame';

export function LorePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Frame className="min-w-0 flex-1" contentClassName="page-surface flex flex-col gap-2 p-4">
      <h3 className="text-center font-serif text-lg font-bold text-page-text/80">{title}</h3>
      <div className="font-serif text-sm italic leading-snug opacity-85">{children}</div>
    </Frame>
  );
}
