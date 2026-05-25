export type FactionId = 'traders' | 'aristocrats' | 'mystics' | 'artisans';

export type Player = {
  name: string;
  status: string;
  level: number;
  levelProgress: number;
  gold: number;
  reputation: Record<FactionId, number>;
};

export type ProfessionId = 'blacksmithing' | 'cooking' | 'carpentry';

export type SkillProgress = {
  level: number;
  levelProgress: number;
};

export type PlayerProfession = {
  skills: Partial<Record<string, SkillProgress>>;
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

export type GameState = {
  player: Player;
  professions: PlayerProfessions;
  taskQueue: TaskQueue;
  currentTask: CurrentTask | null;
  nextQueueId: number;
  lastTickAt: number;
};
