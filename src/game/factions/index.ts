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
  /** Display label, e.g. "Дружелюбные". */
  label: string;
  /** Progress within the current tier. */
  current: number;
  /** Points needed to reach the next tier. */
  next: number;
};

export type Faction = {
  id: FactionId;
  /** Short faction name, e.g. "Рабочие". */
  name: string;
  /** Current attitude word, e.g. "Дружелюбные". */
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
  /** Spine zeppelin asset key (matches files in Building/assets/zeppelin). */
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

// --- Helpers that pull names/icons from the real in-game item library, so the
// faction window shows the same items the player crafts/gathers in the tower. ---

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
    name: 'Рабочие',
    mood: 'Дружелюбные',
    blurb: 'Представители трудового народа, мастера и инженеры.',
    lore:
      'Рабочие гильдии заняты починкой старых паровых машин нижнего города. Они уже считают вашу башню надёжным союзником и охотно делятся ремесленными секретами. Чем выше репутация — тем сложнее чертежи, которые они готовы доверить.',
    quote:
      'Мы ценим тех, кто строит и создаёт. Нам нужны материалы и чертежи, а взамен — труд, знания и честная сделка.',
    portrait: workChar,
    crest: workLabel,
    zeppelinId: 'zeppelin_workers',
    reputation: { label: 'Дружелюбные', current: 750, next: 1200 },
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
      quest('q_workers_planks', 'carpentry_1', 'Бригаде нужны доски для лесов вокруг новой мастерской. Привычная, но нужная работа.', 10, 0, { coins: 250, reputation: 75, blueprints: 1 }),
      quest('q_workers_bars', 'blacksmith_3', 'Кузнецы куют новые инструменты и просят запас железных слитков.', 5, 5, { coins: 180, reputation: 20, blueprints: 0 }),
      quest('q_workers_ore', 'mining_3', 'Плавильни простаивают без руды — доставьте железо, пока печи не остыли.', 12, 4, { coins: 300, reputation: 30, blueprints: 0 }),
      quest('q_workers_bronze', 'blacksmith_2', 'Для шестерён подъёмника нужна бронза. Точный сплав — залог надёжного механизма.', 6, 0, { coins: 220, reputation: 40, blueprints: 1 }),
    ],
    milestones: [
      milestone(300, true, 'carpentry_1', 'Чертёж: Верстак', 'carpentry_2', 'Резная скамья'),
      milestone(700, true, 'blacksmith_2', 'Чертёж: Литейная форма', 'blacksmith_1', 'Медный флюгер'),
      milestone(1200, false, 'carpentry_3', 'Чертёж: Дубовый сундук', 'carpentry_3', 'Кованый сундук'),
      milestone(2000, false, 'blacksmith_3', 'Чертёж: Каркас крана', 'mining_3', 'Железная горгулья'),
      milestone(3200, false, 'carpentry_4', 'Чертёж: Инженерный стол', 'carpentry_4', 'Дубовый стяг гильдии'),
    ],
  },
  traders: {
    id: 'traders',
    name: 'Торговцы',
    mood: 'Нейтральные',
    blurb: 'Гильдия купцов, что возит товары меж парящих городов.',
    lore:
      'Купеческая гильдия приглядывается к вашей башне как к новой точке на торговом пути. Пока они держатся нейтрально и взвешивают каждую сделку, но удачные поставки быстро превращают холодный расчёт в выгодное партнёрство.',
    quote:
      'Прибыль любит смелых. Принесёшь редкое — уйдёшь не с пустыми руками. Всё имеет свою цену.',
    portrait: tradChar,
    crest: tradLabel,
    zeppelinId: 'zeppelin_trade',
    reputation: { label: 'Нейтральные', current: 300, next: 800 },
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
      quest('q_traders_tuna', 'cooking_5', 'Богатый клиент с верхних ярусов заказал банкет. Тунцовые стейки украсят стол гильдии.', 5, 0, { coins: 400, reputation: 90, blueprints: 1 }),
      quest('q_traders_salmon', 'fishing_4', 'Караван уходит к дальним городам — лосось хорошо хранится в пути и дорого продаётся.', 10, 6, { coins: 220, reputation: 35, blueprints: 0 }),
    ],
    milestones: [
      milestone(250, true, 'cooking_2', 'Чертёж: Лоток торговца', 'fishing_2', 'Вывеска лавки'),
      milestone(600, false, 'cooking_3', 'Чертёж: Форель на масле', 'cooking_3', 'Расписной поднос'),
      milestone(1100, false, 'cooking_4', 'Чертёж: Коптильня', 'fishing_4', 'Гирлянда фонарей'),
      milestone(1800, false, 'cooking_5', 'Чертёж: Банкетный стол', 'cooking_5', 'Купеческий герб'),
      milestone(2800, false, 'carpentry_3', 'Чертёж: Торговый сундук', 'carpentry_3', 'Сундук гильдии'),
    ],
  },
  aristocrats: {
    id: 'aristocrats',
    name: 'Аристократы',
    mood: 'Сдержанные',
    blurb: 'Знатные дома, ценящие роскошь и тонкую работу.',
    lore:
      'Знатные дома наблюдают за вашей башней со сдержанным любопытством. Их интерес ещё нужно заслужить безупречным качеством — но за изящную работу они платят щедро и открывают двери в высший свет парящих городов.',
    quote:
      'Нас непросто впечатлить. Но изящество и качество мы вознаграждаем щедро — если они того стоят.',
    portrait: aristChar,
    crest: aristLabel,
    zeppelinId: 'zeppelin_arist',
    reputation: { label: 'Сдержанные', current: 120, next: 600 },
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
      quest('q_arist_desk', 'carpentry_4', 'Графиня обустраивает кабинет и желает письменный стол безупречной работы.', 6, 0, { coins: 600, reputation: 110, blueprints: 1 }),
      quest('q_arist_mithril', 'blacksmith_4', 'Для парадных доспехов наследника нужен светлый мифрил — только лучшие слитки.', 3, 1, { coins: 450, reputation: 80, blueprints: 0 }),
    ],
    milestones: [
      milestone(200, false, 'carpentry_2', 'Чертёж: Изящный табурет', 'carpentry_2', 'Бархатное кресло'),
      milestone(600, false, 'carpentry_4', 'Чертёж: Письменный стол', 'carpentry_4', 'Резной паркет'),
      milestone(1200, false, 'blacksmith_4', 'Чертёж: Мифриловая отделка', 'mining_4', 'Мифриловая люстра'),
      milestone(2000, false, 'carpentry_5', 'Чертёж: Парадный лук', 'blacksmith_5', 'Золочёная статуя'),
      milestone(3200, false, 'blacksmith_5', 'Чертёж: Адамантовый трон', 'mining_5', 'Геральдический витраж'),
    ],
  },
  mystics: {
    id: 'mystics',
    name: 'Мистики',
    mood: 'Осторожные',
    blurb: 'Орден искателей тайн и древних знаний.',
    lore:
      'Орден мистиков сторонится чужаков и пока лишь осторожно прощупывает ваши намерения. Их влечёт не золото, а редкие материалы, хранящие силу. Заслужите доверие — и они приоткроют древние чертежи и забытые тайны башен.',
    quote:
      'Не всё измеряется золотом. Принеси нам то, что хранит силу, и мы откроем тебе сокрытое.',
    portrait: mageChar,
    crest: mageLabel,
    zeppelinId: 'zeppelin_mith',
    reputation: { label: 'Осторожные', current: 80, next: 500 },
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
      quest('q_mystics_adamant', 'mining_5', 'Для ритуального круга нужна адамантовая руда — металл, что держит силу веками.', 8, 0, { coins: 500, reputation: 95, blueprints: 1 }),
      quest('q_mystics_yew', 'lumber_5', 'Тисовая древесина идёт на резные жезлы. Орден ценит каждое выдержанное бревно.', 15, 15, { coins: 280, reputation: 45, blueprints: 0 }),
    ],
    milestones: [
      milestone(150, false, 'lumber_4', 'Чертёж: Рунный посох', 'lumber_4', 'Тисовый алтарь'),
      milestone(500, false, 'blacksmith_5', 'Чертёж: Адамантовый фокус', 'mining_5', 'Парящий кристалл'),
      milestone(1000, false, 'mining_4', 'Чертёж: Мифриловый амулет', 'mining_4', 'Светящаяся жаровня'),
      milestone(1700, false, 'carpentry_5', 'Чертёж: Тисовый лук-реликвия', 'lumber_5', 'Звёздный гобелен'),
      milestone(2600, false, 'mining_5', 'Чертёж: Печать ордена', 'mining_5', 'Адамантовый обелиск'),
    ],
  },
};

export const factionOrder: FactionId[] = ['workers', 'traders', 'aristocrats', 'mystics'];
