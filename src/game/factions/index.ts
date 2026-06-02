import { libraryItems } from '@game/library/items';

import aristChar from './assets/arist_char.png';
import aristLabel from './assets/arist_lable.png';
import mageChar from './assets/mage_char.png';
import mageLabel from './assets/mage_lable.png';
import tradChar from './assets/trad_char.png';
import tradLabel from './assets/trad_lable.png';
import workChar from './assets/work_char.png';
import workLabel from './assets/work_lable.png';

export type FactionId = 'workers' | 'traders' | 'aristocrats' | 'mystics';

export type FactionGood = {
  itemId: string;
  name: string;
  icon: string;
  quantity: number;
  price: number;
};

export type FactionBlueprint = {
  id: string;
  name: string;
  icon: string;
  reputationRequired: number;
  price: number;
};

export type FactionReward = {
  coins: number;
  reputation: number;
  blueprints: number;
};

export type FactionQuest = {
  id: string;
  /** Item the faction asks the player to deliver. */
  itemId: string;
  itemName: string;
  icon: string;
  /** Flavour / briefing text shown on the reputation page. */
  description: string;
  required: number;
  delivered: number;
  reward: FactionReward;
};

/** A single reward unlocked at a reputation milestone. */
export type MilestoneReward = {
  name: string;
  icon: string;
};

export type FactionMilestone = {
  /** Total reputation needed to reach this milestone. */
  reputation: number;
  /** Whether the player has already reached this milestone. */
  reached: boolean;
  /** Crafting blueprint granted at this milestone. */
  blueprintReward: MilestoneReward;
  /** Tower decoration granted at this milestone. */
  decorationReward: MilestoneReward;
};

export type ReputationTier = {
  /** Display label, e.g. "Friendly". */
  label: string;
  /** Progress within the current tier. */
  current: number;
  /** Points needed to reach the next tier. */
  next: number;
};

export type Faction = {
  id: FactionId;
  /** Short faction name, e.g. "Workers". */
  name: string;
  /** Current attitude word, e.g. "Friendly". */
  mood: string;
  /** One-line description shown next to the reputation bar. */
  blurb: string;
  /**
   * Longer description of what is currently happening with the faction and
   * what the player knows about them — shown on the reputation page.
   */
  lore: string;
  /** Flavour quote spoken by the visiting representative. */
  quote: string;
  /** Representative portrait. */
  portrait: string;
  /** Faction crest / label. */
  crest: string;
  /** Spine zeppelin asset key (matches files in `public/spine/zeppelin_*`). */
  zeppelinId: string;
  reputation: ReputationTier;
  goods: FactionGood[];
  /** Items the faction is willing to buy from the player. */
  buying: FactionGood[];
  blueprints: FactionBlueprint[];
  quests: FactionQuest[];
  /** Five reputation milestones, each granting a blueprint + a decoration. */
  milestones: FactionMilestone[];
};

function lib(id: string) {
  const item = libraryItems[id];
  if (!item) throw new Error(`Unknown library item: ${id}`);
  return item;
}

function good(itemId: string, quantity: number, price: number): FactionGood {
  const item = lib(itemId);
  return { itemId, name: item.name, icon: item.icon, quantity, price };
}

function blueprint(
  id: string,
  sourceItemId: string,
  reputationRequired: number,
  price: number,
): FactionBlueprint {
  const item = lib(sourceItemId);
  return { id, name: item.name, icon: item.icon, reputationRequired, price };
}

function quest(
  id: string,
  itemId: string,
  description: string,
  required: number,
  delivered: number,
  reward: FactionReward,
): FactionQuest {
  const item = lib(itemId);
  return {
    id,
    itemId,
    itemName: item.name,
    icon: item.icon,
    description,
    required,
    delivered,
    reward,
  };
}

function milestone(
  reputation: number,
  reached: boolean,
  blueprintItemId: string,
  blueprintName: string,
  decorationItemId: string,
  decorationName: string,
): FactionMilestone {
  return {
    reputation,
    reached,
    blueprintReward: { name: blueprintName, icon: lib(blueprintItemId).icon },
    decorationReward: { name: decorationName, icon: lib(decorationItemId).icon },
  };
}

export const factions: Record<FactionId, Faction> = {
  workers: {
    id: 'workers',
    name: 'Workers',
    mood: 'Friendly',
    blurb: 'Representatives of laborers, craftspeople, and engineers.',
    lore:
      'The workers’ guilds are busy repairing the old steam engines of the lower city. They already see your tower as a reliable ally and gladly share craft secrets. The higher your reputation, the more advanced blueprints they are willing to trust you with.',
    quote:
      'We value those who build and create. We need materials and blueprints; in return you get labor, knowledge, and a fair deal.',
    portrait: workChar,
    crest: workLabel,
    zeppelinId: 'zeppelin_workers',
    reputation: { label: 'Friendly', current: 750, next: 1200 },
    goods: [
      good('blacksmith_3', 5, 150),
      good('blacksmith_2', 3, 120),
      good('carpentry_1', 8, 90),
      good('carpentry_3', 2, 240),
    ],
    buying: [
      good('mining_3', 10, 40),
      good('lumber_1', 10, 35),
      good('lumber_3', 6, 55),
      good('mining_2', 8, 45),
    ],
    blueprints: [
      blueprint('bp_workers_chest', 'carpentry_3', 1200, 600),
    ],
    quests: [
      quest('q_workers_planks', 'carpentry_1', 'The crew needs planks for scaffolding around a new workshop. Familiar work, but needed.', 10, 0, { coins: 250, reputation: 75, blueprints: 1 }),
      quest('q_workers_bars', 'blacksmith_3', 'The smiths are forging new tools and need a stock of iron ingots.', 5, 5, { coins: 180, reputation: 20, blueprints: 0 }),
      quest('q_workers_ore', 'mining_3', 'The smelters sit idle without ore — deliver iron before the furnaces cool.', 12, 4, { coins: 300, reputation: 30, blueprints: 0 }),
      quest('q_workers_bronze', 'blacksmith_2', 'Bronze is needed for lift gears. The right alloy is the key to a reliable mechanism.', 6, 0, { coins: 220, reputation: 40, blueprints: 1 }),
    ],
    milestones: [
      milestone(300, true, 'carpentry_1', 'Blueprint: Workbench', 'carpentry_2', 'Carved bench'),
      milestone(700, true, 'blacksmith_2', 'Blueprint: Casting mold', 'blacksmith_1', 'Copper weather vane'),
      milestone(1200, false, 'carpentry_3', 'Blueprint: Oak chest', 'carpentry_3', 'Iron-bound chest'),
      milestone(2000, false, 'blacksmith_3', 'Blueprint: Crane frame', 'mining_3', 'Iron gargoyle'),
      milestone(3200, false, 'carpentry_4', 'Blueprint: Engineer’s desk', 'carpentry_4', 'Guild oak banner'),
    ],
  },
  traders: {
    id: 'traders',
    name: 'Traders',
    mood: 'Neutral',
    blurb: 'The merchant guild that hauls goods between floating cities.',
    lore:
      'The merchant guild is sizing up your tower as a new stop on their trade route. For now they stay neutral and weigh every deal, but successful deliveries quickly turn cold calculation into profitable partnership.',
    quote:
      'Fortune favors the bold. Bring something rare and you will not leave empty-handed. Everything has its price.',
    portrait: tradChar,
    crest: tradLabel,
    zeppelinId: 'zeppelin_trade',
    reputation: { label: 'Neutral', current: 300, next: 800 },
    goods: [
      good('cooking_4', 4, 200),
      good('cooking_5', 2, 260),
      good('cooking_3', 5, 160),
      good('cooking_2', 6, 130),
    ],
    buying: [
      good('fishing_4', 8, 60),
      good('fishing_5', 5, 90),
      good('fishing_3', 10, 45),
      good('fishing_2', 12, 30),
    ],
    blueprints: [
      blueprint('bp_traders_trout', 'cooking_3', 800, 500),
    ],
    quests: [
      quest('q_traders_tuna', 'cooking_5', 'A wealthy client from the upper tiers ordered a banquet. Tuna steaks will grace the guild table.', 5, 0, { coins: 400, reputation: 90, blueprints: 1 }),
      quest('q_traders_salmon', 'fishing_4', 'A caravan heads to distant cities — salmon keeps well on the road and sells for a fine price.', 10, 6, { coins: 220, reputation: 35, blueprints: 0 }),
    ],
    milestones: [
      milestone(250, true, 'cooking_2', 'Blueprint: Trader’s tray', 'fishing_2', 'Shop sign'),
      milestone(600, false, 'cooking_3', 'Blueprint: Trout in butter', 'cooking_3', 'Painted serving tray'),
      milestone(1100, false, 'cooking_4', 'Blueprint: Smokehouse', 'fishing_4', 'Lantern garland'),
      milestone(1800, false, 'cooking_5', 'Blueprint: Banquet table', 'cooking_5', 'Merchant crest'),
      milestone(2800, false, 'carpentry_3', 'Blueprint: Trade chest', 'carpentry_3', 'Guild strongbox'),
    ],
  },
  aristocrats: {
    id: 'aristocrats',
    name: 'Aristocrats',
    mood: 'Reserved',
    blurb: 'Noble houses that prize luxury and fine craftsmanship.',
    lore:
      'The noble houses watch your tower with reserved curiosity. You still must earn their interest with flawless quality — but for elegant work they pay generously and open doors to the highest circles of the floating cities.',
    quote:
      'We are not easy to impress. Yet grace and quality we reward generously — when they are worthy.',
    portrait: aristChar,
    crest: aristLabel,
    zeppelinId: 'zeppelin_arist',
    reputation: { label: 'Reserved', current: 120, next: 600 },
    goods: [
      good('carpentry_4', 3, 340),
      good('blacksmith_4', 1, 520),
      good('carpentry_5', 2, 480),
      good('blacksmith_5', 1, 640),
    ],
    buying: [
      good('mining_4', 4, 220),
      good('mining_5', 3, 300),
      good('carpentry_2', 5, 120),
      good('lumber_4', 8, 70),
    ],
    blueprints: [
      blueprint('bp_arist_desk', 'carpentry_4', 600, 900),
    ],
    quests: [
      quest('q_arist_desk', 'carpentry_4', 'The countess is furnishing her study and wants a writing desk of impeccable craft.', 6, 0, { coins: 600, reputation: 110, blueprints: 1 }),
      quest('q_arist_mithril', 'blacksmith_4', 'Parade armor for the heir needs bright mithril — only the finest ingots will do.', 3, 1, { coins: 450, reputation: 80, blueprints: 0 }),
    ],
    milestones: [
      milestone(200, false, 'carpentry_2', 'Blueprint: Elegant stool', 'carpentry_2', 'Velvet chair'),
      milestone(600, false, 'carpentry_4', 'Blueprint: Writing desk', 'carpentry_4', 'Parquet inlay'),
      milestone(1200, false, 'blacksmith_4', 'Blueprint: Mithril trim', 'mining_4', 'Mithril chandelier'),
      milestone(2000, false, 'carpentry_5', 'Blueprint: Parade bow', 'blacksmith_5', 'Gilded statue'),
      milestone(3200, false, 'blacksmith_5', 'Blueprint: Adamant throne', 'mining_5', 'Heraldic stained glass'),
    ],
  },
  mystics: {
    id: 'mystics',
    name: 'Mystics',
    mood: 'Cautious',
    blurb: 'An order of seekers after secrets and ancient knowledge.',
    lore:
      'The mystic order keeps strangers at arm’s length and only cautiously tests your intentions. Gold does not draw them — rare materials that hold power do. Earn their trust and they will reveal ancient blueprints and forgotten tower secrets.',
    quote:
      'Not everything is measured in gold. Bring us what holds power, and we will show you what is hidden.',
    portrait: mageChar,
    crest: mageLabel,
    zeppelinId: 'zeppelin_mith',
    reputation: { label: 'Cautious', current: 80, next: 500 },
    goods: [
      good('mining_4', 3, 280),
      good('mining_5', 2, 360),
      good('mining_3', 5, 180),
      good('mining_2', 6, 140),
    ],
    buying: [
      good('lumber_5', 12, 30),
      good('lumber_4', 10, 45),
      good('lumber_3', 10, 40),
      good('fishing_1', 15, 20),
    ],
    blueprints: [
      blueprint('bp_mystics_adamant', 'blacksmith_5', 500, 700),
    ],
    quests: [
      quest('q_mystics_adamant', 'mining_5', 'Adamant ore is needed for a ritual circle — metal that holds power for ages.', 8, 0, { coins: 500, reputation: 95, blueprints: 1 }),
      quest('q_mystics_yew', 'lumber_5', 'Yew wood goes into carved staves. The order values every well-seasoned log.', 15, 15, { coins: 280, reputation: 45, blueprints: 0 }),
    ],
    milestones: [
      milestone(150, false, 'lumber_4', 'Blueprint: Rune staff', 'lumber_4', 'Yew altar'),
      milestone(500, false, 'blacksmith_5', 'Blueprint: Adamant focus', 'mining_5', 'Floating crystal'),
      milestone(1000, false, 'mining_4', 'Blueprint: Mithril amulet', 'mining_4', 'Glowing brazier'),
      milestone(1700, false, 'carpentry_5', 'Blueprint: Yew relic bow', 'lumber_5', 'Star tapestry'),
      milestone(2600, false, 'mining_5', 'Blueprint: Order seal', 'mining_5', 'Adamant obelisk'),
    ],
  },
};

export const factionOrder: FactionId[] = ['workers', 'traders', 'aristocrats', 'mystics'];
