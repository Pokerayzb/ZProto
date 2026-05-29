import React, { useState, type ReactNode, type ReactElement } from 'react';

import { Chapter, type ChapterProps } from './Chapter';
import { BurningDot } from './BurningDot';
import './index.css';
import frameName from './assets/frame_name.png';

export interface BookProps {
  name: string;
  children?: ReactNode;
  className?: string;
}

export function Book({ name, children, className }: BookProps) {
  const chapterElements = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Chapter
  ) as ReactElement<ChapterProps>[];

  const [activeChapterId, setActiveChapterId] = useState(chapterElements[0]?.props.id);
  const classes = 'book-wrapper flex flex-col' + (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <h2 className="sr-only">{name}</h2>
      <div className="flex justify-center gap-1 relative z-10 mb-[-6px]">
        {chapterElements.map((chapter) => {
          const isActive = activeChapterId === chapter.props.id;
          return (
            <button
              key={chapter.props.id}
              className="relative cursor-pointer transition-all flex items-end justify-center text-[#f5deb3] drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]"
              onClick={() => setActiveChapterId(chapter.props.id)}
              style={{
                backgroundImage: `url(${frameName})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                aspectRatio: '258 / 59',
                width: `${100 / chapterElements.length}%`,
                maxWidth: '260px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
              }}
            >
              {isActive && <BurningDot />}
              <span className="text-2xl font-bold leading-none pb-2">{chapter.props.label}</span>
            </button>
          );
        })}
      </div>
      <div className="book flex-1 min-h-0 relative z-0">
        <div className="page h-full">
          <div className="inner h-full flex flex-col p-4">
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
