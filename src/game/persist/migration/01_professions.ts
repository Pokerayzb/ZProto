import {
  createDefaultPlayerSkill,
  createEmptyProfession,
} from '@game/state/initialState';
import {
  GATHERING_PROFESSION_IDS,
  PROFESSION_IDS,
  getDefaultGatheringSkillId,
  getProfessionIdFromSkillId,
} from '@game/domain/professions';
import {
  createLevelProgress,
  initialLevelProgress,
  type LevelProgress,
} from '@game/progression';
import type { CurrentTask, ProfessionId, QueuedTask, TaskQueue } from '@game/state/types';

type LegacyProfession = {
  level?: LevelProgress;
  skillPoints?: number;
  skills?: Record<string, unknown>;
  taskQueue?: TaskQueue;
  currentTask?: CurrentTask | null;
};

type LegacyState = {
  professions?: Record<string, LegacyProfession>;
  taskQueue?: TaskQueue;
  currentTask?: CurrentTask | null;
};

export function migrateProfessions(state: unknown) {
  if (typeof state !== 'object' || state === null) {
    return state;
  }

  const next = structuredClone(state) as LegacyState;

  if (!next.professions)
    return next;

  for (const professionId of PROFESSION_IDS) {
    const profession = next.professions[professionId] ?? createEmptyProfession();
    next.professions[professionId] = {
      ...createEmptyProfession(),
      ...profession,
      skills: profession.skills ?? {},
      taskQueue: profession.taskQueue ?? [],
      currentTask: profession.currentTask ?? null,
    };
  }

  for (const professionId of PROFESSION_IDS) {
    const profession = next.professions[professionId];
    if (profession !== undefined) {
      migrateProfessionProgress(profession);
    }
  }

  for (const professionId of GATHERING_PROFESSION_IDS) {
    const profession = next.professions[professionId];
    if (!profession)
      continue;

    const skillId = getDefaultGatheringSkillId(professionId);
    if (skillId === undefined) {
      continue;
    }

    if (profession.skills?.[skillId] === undefined) {
      profession.skills ??= {};
      profession.skills[skillId] = createDefaultPlayerSkill();
    }
  }

  migrateGlobalTasks(next);

  delete next.taskQueue;
  delete next.currentTask;

  return next;
}

function migrateProfessionProgress(profession: LegacyProfession) {
  let professionLevel = isLevelProgress(profession.level)
    ? profession.level
    : initialLevelProgress;

  profession.skillPoints =
    typeof profession.skillPoints === 'number' ? profession.skillPoints : 0;

  if (!profession.skills)
    return;

  for (const [skillId, skill] of Object.entries(profession.skills)) {
    if (isPlayerSkillShape(skill))
      continue;

    const legacyLevel = extractLegacySkillLevel(skill);
    if (legacyLevel !== undefined) {
      professionLevel = pickHigherLevelProgress(professionLevel, legacyLevel);
    }

    profession.skills[skillId] = {
      applications: 0,
      favorite: extractLegacyFavorite(skill),
    };
  }

  profession.level = professionLevel;
}

function extractLegacySkillLevel(skill: unknown): LevelProgress | undefined {
  if (isLevelProgress(skill))
    return skill;

  if (
    typeof skill === 'object' &&
    skill !== null &&
    'level' in skill &&
    isLevelProgress((skill as { level: unknown }).level)
  ) {
    return (skill as { level: LevelProgress }).level;
  }

  return undefined;
}

function extractLegacyFavorite(skill: unknown): boolean {
  return (
    typeof skill === 'object' &&
    skill !== null &&
    'favorite' in skill &&
    Boolean((skill as { favorite: unknown }).favorite)
  );
}

function pickHigherLevelProgress(a: LevelProgress, b: LevelProgress): LevelProgress {
  if (b.value > a.value)
    return createLevelProgress(b.value, b.progress);

  if (b.value < a.value)
    return a;

  if (b.progress > a.progress)
    return createLevelProgress(b.value, b.progress);

  return a;
}

function migrateGlobalTasks(state: LegacyState) {
  const globalQueue = state.taskQueue ?? [];
  const globalCurrentTask = state.currentTask ?? null;

  if (globalQueue.length === 0 && globalCurrentTask === null)
    return;

  const queuesByProfession: Partial<Record<ProfessionId, QueuedTask[]>> = {};

  for (const task of globalQueue) {
    const professionId = getProfessionIdFromSkillId(task.skillId);
    if (professionId === undefined)
      continue;

    const queue = queuesByProfession[professionId] ?? [];
    queue.push(task);
    queuesByProfession[professionId] = queue;
  }

  if (globalCurrentTask !== null) {
    const professionId = getProfessionIdFromSkillId(globalCurrentTask.skillId);
    if (professionId !== undefined) {
      const profession = state.professions?.[professionId];
      if (profession !== undefined && profession.currentTask === null) {
        profession.currentTask = globalCurrentTask;
      }
    }
  }

  for (const professionId of PROFESSION_IDS) {
    const tasks = queuesByProfession[professionId];
    if (tasks === undefined || tasks.length === 0) {
      continue;
    }

    const profession = state.professions?.[professionId];
    if (profession === undefined) {
      continue;
    }

    profession.taskQueue = [...(profession.taskQueue ?? []), ...tasks];
  }
}

function isLevelProgress(value: unknown): value is LevelProgress {
  return (
    typeof value === 'object' &&
    value !== null &&
    'value' in value &&
    'target' in value &&
    'progress' in value
  );
}

function isPlayerSkillShape(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'applications' in value &&
    'favorite' in value &&
    !('level' in value)
  );
}
