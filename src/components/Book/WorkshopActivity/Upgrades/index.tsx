import { Frame } from '@components/Frame';

const UPGRADE_SLOT_COUNT = 3;

export function Upgrades() {
  return (
    <div className="grid shrink-0 grid-cols-3 gap-2">
      {Array.from({ length: UPGRADE_SLOT_COUNT }, (_, index) => (
        <button
          key={index}
          type="button"
          className="group aspect-square cursor-pointer border-0 bg-transparent p-0"
          aria-label={`Workshop upgrade slot ${index + 1}`}
        >
          <Frame
            className="h-full"
            contentClassName="page-surface grid h-full place-items-center"
          >
            <span
              className="text-[2.5rem] font-bold leading-none text-page-text/35 transition-colors group-hover:text-page-text/55"
              aria-hidden
            >
              +
            </span>
          </Frame>
        </button>
      ))}
    </div>
  );
}
