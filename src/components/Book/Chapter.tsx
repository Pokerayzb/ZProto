import type { ReactNode } from 'react';

import type { ProfessionId } from '@game/state/types';

import { ChapterProfessionHeader } from './ChapterProfessionHeader';

export interface ChapterProps {
  id: string;
  label: string;
  isActive?: boolean;
  professionId?: ProfessionId;
  children?: ReactNode;
}

export function Chapter({
  isActive,
  professionId,
  children,
}: ChapterProps) {
  if (!isActive) return null;

  return (
    <div className="chapter flex h-full min-h-0 flex-1 flex-col">
      {professionId ? (
        <ChapterProfessionHeader professionId={professionId} />
      ) : null}
      <div className="chapter-layout grid h-full min-h-0 flex-1 grid-cols-3 divide-x divide-button-text">
        {children}
      </div>
    </div>
  );
}
