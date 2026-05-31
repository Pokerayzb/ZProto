import { Frame } from '@components/Frame';
import { ProgressBar } from '@components/ProgressBar';

export type TaskCardProgress =
  {
    startedAt: number;
    totalMs: number;
  };

export interface TaskCardProps {
  title: string;
  count: number;
  iconSrc?: string;
  onRemove: () => void;
  progress?: TaskCardProgress;
  className?: string;
}

export function TaskCard({
  title,
  count,
  iconSrc,
  onRemove,
  progress,
  className,
}: TaskCardProps) {
  const classes =
    `task-card h-20 flex-none` +
    (className ? ` ${className}` : '');

  return (
    <Frame
      className={classes}
      contentClassName="page-surface relative flex h-full items-center gap-3 px-3 py-2"
    >
      <button
        type="button"
        className="absolute top-1.5 right-1.5 border-0 bg-transparent p-0 text-sm leading-none text-page-text"
        aria-label="Remove from queue"
        onClick={onRemove}
      >
        ✕
      </button>
      <div className="icon-slot size-14 shrink-0">
        {iconSrc ? <img src={iconSrc} alt="" className="size-full object-contain" /> : null}
      </div>
      <div
        className={
          'task-body min-w-0 flex-1' +
          (progress ? ' flex flex-col justify-center gap-0.5' : '')
        }
      >
        <div className="title-row flex min-w-0 items-center gap-2">
          <div className="title min-w-0 flex-1 truncate text-center text-lg font-bold leading-tight">
            {title}
          </div>
          <span className="shrink-0 text-2xl font-bold leading-none">×{count}</span>
        </div>
        {progress ? (
          <ProgressBar
            mode="timed"
            startedAt={progress.startedAt}
            totalMs={progress.totalMs}
            size="small"
          />
        ) : null}
      </div>
    </Frame>
  );
}
