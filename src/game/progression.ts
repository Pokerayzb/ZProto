/**
 * XP curve tunables — swap the formula below when the designer settles on numbers.
 * `experienceRequiredForLevel(n)` is how much XP is needed to go from level n → n+1.
 */
export const progressionConfig = {
  baseExperience: 100,
  growthFactor: 1.25,
} as const;

export type LevelProgress = {
  value: number;
  target: number;
  progress: number;
};

export function experienceRequiredForLevel(value: number): number {
  const level = Math.max(1, Math.floor(value));

  return Math.floor(
    progressionConfig.baseExperience *
      Math.pow(progressionConfig.growthFactor, level - 1),
  );
}

export function createLevelProgress(value: number, progress = 0): LevelProgress {
  return {
    value,
    target: experienceRequiredForLevel(value),
    progress,
  };
}

export const initialLevelProgress = createLevelProgress(1, 0);

export function applyExperience(
  current: LevelProgress,
  experienceGained: number,
): LevelProgress {
  if (experienceGained === 0) {
    return current;
  }

  let value = current.value;
  let progress = current.progress + experienceGained;

  while (progress >= experienceRequiredForLevel(value)) {
    progress -= experienceRequiredForLevel(value);
    value += 1;
  }

  return createLevelProgress(value, progress);
}
