import type { LevelProgress } from '@game/progression';

export type { LevelProgress };

export type FactionId = 'traders' | 'aristocrats' | 'mystics' | 'artisans';

export type Player = {
  name: string;
  status: string;
  level: LevelProgress;
  gold: number;
  reputation: Record<FactionId, number>;
};

export type ProfessionId = 'blacksmithing' | 'cooking' | 'carpentry' | 'forest' | 'mine' | 'river';

export type PlayerProfession = {
  skills: Partial<Record<string, LevelProgress>>;
};

export type PlayerProfessions = Record<ProfessionId, PlayerProfession>;

export type QueuedTask = {
  id: number;
  skillId: string;
  count: number;
};

export type TaskQueue = QueuedTask[];

export type CurrentTask = {
  skillId: string;
  startedAt: number;
};

export type Inventory = Record<string, number>;

export type GameState = {
  player: Player;
  inventory: Inventory;
  professions: PlayerProfessions;
  taskQueue: TaskQueue;
  currentTask: CurrentTask | null;
  nextQueueId: number;
  lastTickAt: number;
};
