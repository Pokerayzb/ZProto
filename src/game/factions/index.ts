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
  required: number;
  delivered: number;
  reward: FactionReward;
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
};

// Placeholder content — to be replaced with real faction data later.
const placeholderIcon = aristLabel;

export const factions: Record<FactionId, Faction> = {
  workers: {
    id: 'workers',
    name: 'Рабочие',
    mood: 'Дружелюбные',
    blurb: 'Представители трудового народа, мастера и инженеры.',
    quote:
      'Мы ценим тех, кто строит и создаёт. Нам нужны материалы и чертежи, а взамен — труд, знания и честная сделка.',
    portrait: workChar,
    crest: workLabel,
    zeppelinId: 'zeppelin_workers',
    reputation: { label: 'Дружелюбные', current: 750, next: 1200 },
    goods: [
      { itemId: 'steel_ingot', name: 'Стальной слиток', icon: placeholderIcon, quantity: 5, price: 150 },
      { itemId: 'gears', name: 'Шестерни', icon: placeholderIcon, quantity: 3, price: 120 },
      { itemId: 'oil', name: 'Масло', icon: placeholderIcon, quantity: 2, price: 90 },
      { itemId: 'sturdy_plank', name: 'Крепкая доска', icon: placeholderIcon, quantity: 5, price: 110 },
    ],
    buying: [
      { itemId: 'iron_ore', name: 'Железная руда', icon: placeholderIcon, quantity: 10, price: 40 },
      { itemId: 'timber', name: 'Брёвна', icon: placeholderIcon, quantity: 10, price: 35 },
    ],
    blueprints: [
      { id: 'bp_steam_valve', name: 'Паровой клапан', icon: placeholderIcon, reputationRequired: 1200, price: 600 },
    ],
    quests: [
      {
        id: 'q_workers_planks',
        itemId: 'sturdy_plank',
        itemName: 'Крепкая доска',
        icon: placeholderIcon,
        required: 10,
        delivered: 0,
        reward: { coins: 250, reputation: 75, blueprints: 1 },
      },
    ],
  },
  traders: {
    id: 'traders',
    name: 'Торговцы',
    mood: 'Нейтральные',
    blurb: 'Гильдия купцов, что возит товары меж парящих городов.',
    quote:
      'Прибыль любит смелых. Принесёшь редкое — уйдёшь не с пустыми руками. Всё имеет свою цену.',
    portrait: tradChar,
    crest: tradLabel,
    zeppelinId: 'zeppelin_trade',
    reputation: { label: 'Нейтральные', current: 300, next: 800 },
    goods: [
      { itemId: 'spice', name: 'Пряности', icon: placeholderIcon, quantity: 4, price: 200 },
      { itemId: 'silk', name: 'Шёлк', icon: placeholderIcon, quantity: 2, price: 260 },
    ],
    buying: [
      { itemId: 'cooked_fish', name: 'Жареная рыба', icon: placeholderIcon, quantity: 8, price: 60 },
    ],
    blueprints: [
      { id: 'bp_scales', name: 'Точные весы', icon: placeholderIcon, reputationRequired: 800, price: 500 },
    ],
    quests: [
      {
        id: 'q_traders_silk',
        itemId: 'silk',
        itemName: 'Шёлк',
        icon: placeholderIcon,
        required: 5,
        delivered: 0,
        reward: { coins: 400, reputation: 90, blueprints: 1 },
      },
    ],
  },
  aristocrats: {
    id: 'aristocrats',
    name: 'Аристократы',
    mood: 'Сдержанные',
    blurb: 'Знатные дома, ценящие роскошь и тонкую работу.',
    quote:
      'Нас непросто впечатлить. Но изящество и качество мы вознаграждаем щедро — если они того стоят.',
    portrait: aristChar,
    crest: aristLabel,
    zeppelinId: 'zeppelin_arist',
    reputation: { label: 'Сдержанные', current: 120, next: 600 },
    goods: [
      { itemId: 'fine_wine', name: 'Изысканное вино', icon: placeholderIcon, quantity: 3, price: 340 },
      { itemId: 'jewelry', name: 'Украшения', icon: placeholderIcon, quantity: 1, price: 520 },
    ],
    buying: [
      { itemId: 'gold_ingot', name: 'Золотой слиток', icon: placeholderIcon, quantity: 4, price: 220 },
    ],
    blueprints: [
      { id: 'bp_chandelier', name: 'Хрустальная люстра', icon: placeholderIcon, reputationRequired: 600, price: 900 },
    ],
    quests: [
      {
        id: 'q_arist_wine',
        itemId: 'fine_wine',
        itemName: 'Изысканное вино',
        icon: placeholderIcon,
        required: 6,
        delivered: 0,
        reward: { coins: 600, reputation: 110, blueprints: 1 },
      },
    ],
  },
  mystics: {
    id: 'mystics',
    name: 'Мистики',
    mood: 'Осторожные',
    blurb: 'Орден искателей тайн и древних знаний.',
    quote:
      'Не всё измеряется золотом. Принеси нам то, что хранит силу, и мы откроем тебе сокрытое.',
    portrait: mageChar,
    crest: mageLabel,
    zeppelinId: 'zeppelin_mith',
    reputation: { label: 'Осторожные', current: 80, next: 500 },
    goods: [
      { itemId: 'rune_dust', name: 'Рунная пыль', icon: placeholderIcon, quantity: 3, price: 280 },
      { itemId: 'crystal', name: 'Кристалл', icon: placeholderIcon, quantity: 2, price: 360 },
    ],
    buying: [
      { itemId: 'herbs', name: 'Травы', icon: placeholderIcon, quantity: 12, price: 30 },
    ],
    blueprints: [
      { id: 'bp_ward', name: 'Оберег', icon: placeholderIcon, reputationRequired: 500, price: 700 },
    ],
    quests: [
      {
        id: 'q_mystics_crystal',
        itemId: 'crystal',
        itemName: 'Кристалл',
        icon: placeholderIcon,
        required: 8,
        delivered: 0,
        reward: { coins: 500, reputation: 95, blueprints: 1 },
      },
    ],
  },
};

export const factionOrder: FactionId[] = ['workers', 'traders', 'aristocrats', 'mystics'];
