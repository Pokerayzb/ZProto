import type { LibrarySkill } from '@game/library/types';

export function getSkillDurationMs(skill: LibrarySkill): number {
  return skill.duration;
}

export function getSkillDurationLabel(skill: LibrarySkill): string {
  const seconds = skill.duration / 1000;
  return Number.isInteger(seconds) ? `${seconds}s` : `${seconds.toFixed(1)}s`;
}

export function formatRemainingTime(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

  if (totalSeconds >= 60) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  return `${totalSeconds}s`;
}

export function getSkillXp(skill: LibrarySkill): number {
  return skill.xp;
}

export function getSkillDescription(skill: LibrarySkill): string {
  return skill.description;
}
