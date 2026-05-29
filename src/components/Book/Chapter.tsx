import type { ReactNode } from 'react';

export interface ChapterProps {
  id: string;
  label: string;
  isActive?: boolean;
  children?: ReactNode;
}

export function Chapter({ isActive, children }: ChapterProps) {
  if (!isActive) return null;
  return <div className="chapter-layout flex-1 h-full flex flex-col">{children}</div>;
}
