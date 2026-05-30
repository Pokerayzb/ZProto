import React, { useState, type ReactNode, type ReactElement } from 'react';

import { Chapter, type ChapterProps } from './Chapter';
import { BurningDot } from './BurningDot';
import './index.css';
import frameName from './assets/frame_name.png';

export interface BookProps {
  name: string;
  children?: ReactNode;
  className?: string;
  initialChapterId?: string;
}

export function Book({ name, children, className, initialChapterId }: BookProps) {
  const chapterElements = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Chapter
  ) as ReactElement<ChapterProps>[];

  const defaultChapterId = chapterElements[0]?.props.id;
  const [activeChapterId, setActiveChapterId] = useState(
    initialChapterId ?? defaultChapterId,
  );
  const tabWidthPercent = 100 / chapterElements.length;
  const classes =
    'book-wrapper mx-auto flex w-full max-w-[var(--book-max-width)] flex-col' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <h2 className="sr-only">{name}</h2>
      <div
        className="book-tabs relative z-20 flex justify-center gap-1"
        style={{ ['--book-tab-bg' as string]: `url(${frameName})` }}
      >
        {chapterElements.map((chapter) => {
          const isActive = activeChapterId === chapter.props.id;
          return (
            <button
              key={chapter.props.id}
              type="button"
              className="book-tab relative flex cursor-pointer items-end justify-center text-button-text transition-all"
              style={{ width: `${tabWidthPercent}%` }}
              onClick={() => setActiveChapterId(chapter.props.id)}
            >
              {isActive && <BurningDot />}
              <span className="pb-2 text-2xl font-bold leading-none">{chapter.props.label}</span>
            </button>
          );
        })}
      </div>
      <div className="book relative z-0 min-h-0 flex-1">
        <div className="page page-surface h-full">
          <div className="inner flex h-full flex-col p-4">
            {chapterElements.map(chapter =>
              React.cloneElement(chapter, {
                key: chapter.props.id,
                isActive: activeChapterId === chapter.props.id
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
