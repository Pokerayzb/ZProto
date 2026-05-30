import type { KeyboardEvent, MouseEvent } from 'react';

import { Frame } from '@components/Frame';
import { SetSkillFavorite } from '@game/events/SetSkillFavorite';
import { useGameDispatch } from '@game/hooks/useGameDispatch';
import { useWorkshopSkillState } from '@game/hooks/useWorkshopSkillState';
import { gameLibrary } from '@game/library/gameLibrary';
import type { LibrarySkill } from '@game/library/types';

import './index.css';
import starEmpty from './assets/star-empty.svg';
import starFilled from './assets/star-filled.svg';

export type RecipeState = 'disabled' | 'available' | 'selected';

export interface RecipeProps {
  skill: LibrarySkill;
  selected?: boolean;
  className?: string;
  onSelect?: () => void;
}

export function Recipe({
  skill,
  selected = false,
  className,
  onSelect,
}: RecipeProps) {
  const dispatch = useGameDispatch();
  const item = gameLibrary.items[skill.id];
  const workshopSkill = useWorkshopSkillState(skill);
  const title = item?.name ?? skill.id;
  const state =
    selected || workshopSkill.isQueuedOrCurrent
      ? 'selected'
      : !workshopSkill.isLearned
        ? 'disabled'
        : 'available';
  const isDisabled = state === 'disabled';
  const isFavorite = workshopSkill.isFavorite;
  const canFavorite = !isDisabled;
  const isSelected = state === 'selected';
  const classes =
    'recipe h-20 flex-none' +
    (isSelected ? ' selected' : '') +
    (isDisabled ? ' disabled' : '') +
    (className ? ' ' + className : '');

  function handleSelect() {
    if (isDisabled) return;
    onSelect?.();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    handleSelect();
  }

  function handleFavoriteClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!canFavorite) return;
    dispatch(new SetSkillFavorite(skill.id, !isFavorite));
  }

  return (
    <Frame
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      className={classes}
      contentClassName="page-surface grid h-full grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] grid-rows-2 items-center gap-x-3 px-3 py-2"
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className="icon-slot col-start-1 row-span-2 row-start-1 size-14">
        <img src={skill.icon} alt={title} className="size-full object-contain" />
      </div>
      <div className="col-span-2 col-start-2 row-start-1 self-center truncate text-center text-lg leading-tight">{title}</div>
      <span className="col-start-2 row-start-2 self-center truncate text-center text-sm leading-tight">
        Current: {workshopSkill.currentQuantity}
      </span>
      <span className="col-start-3 row-start-2 self-center truncate text-center text-sm leading-tight">
        Available: {workshopSkill.maxCraftableQuantity}
      </span>
      <button
        type="button"
        className="favorite col-start-4 row-span-2 row-start-1 grid size-9 place-items-center disabled:cursor-not-allowed disabled:opacity-disabled"
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        disabled={!canFavorite}
        onClick={handleFavoriteClick}
      >
        <img src={isFavorite ? starFilled : starEmpty} alt="" className="star size-full" />
      </button>
    </Frame>
  );
}
