import { Book } from '@components/Book';
import { ScrollArea } from '@components/ScrollArea';

import { gameLibrary } from '@game/library/gameLibrary';
import { useGameState } from '@game/hooks/useGameState';
import { definePage } from '../definePage';

import { InventoryItem } from './InventoryItem';
import background from './assets/background.png';
import icon from './assets/icon.png';

export function InventoryComponent() {
  const inventory = useGameState((state) => state.inventory);

  const items = Object.values(gameLibrary.items);

  const rawMaterials = items.filter((item) =>
    item.id.startsWith('fishing_') || item.id.startsWith('lumber_') || item.id.startsWith('mining_')
  );

  const craftedGoods = items.filter((item) =>
    item.id.startsWith('cooking_') || item.id.startsWith('carpentry_') || item.id.startsWith('blacksmith_')
  );

  function renderItemGrid(itemsList: typeof items) {
    const owned = itemsList.filter((item) => (inventory[item.id] ?? 0) > 0);

    if (owned.length === 0) {
      return (
        <p className="py-8 text-center text-page-text/40">Nothing in stock yet.</p>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-3 py-1 pr-1">
        {owned.map((item) => (
          <InventoryItem
            key={item.id}
            itemId={item.id}
            quantity={inventory[item.id] ?? 0}
          />
        ))}
      </div>
    );
  }

  function inventoryPanel(itemsList: typeof items, title: string, blurb: string) {
    return (
      <div className="flex h-full min-h-0 flex-1">
        <section className="flex min-h-0 min-w-0 flex-[2] flex-col">
          <ScrollArea className="min-h-0 flex-1">{renderItemGrid(itemsList)}</ScrollArea>
        </section>
        <div className="w-px shrink-0 self-stretch bg-button-text" aria-hidden />
        <section className="flex min-w-0 flex-1 flex-col items-center justify-center p-6">
          <div className="text-center">
            <h3 className="mb-3 font-serif text-2xl font-bold">{title}</h3>
            <p className="text-sm leading-relaxed opacity-75">{blurb}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <Book
      name="Inventory"
      panels={[
        {
          id: 'raw',
          label: 'Raw Materials',
          content: inventoryPanel(
            rawMaterials,
            'Resource Stockpile',
            'Raw goods gathered from the river, mine, and forests. These materials require no ingredients to collect but serve as the vital foundation for all your crafting recipes.',
          ),
        },
        {
          id: 'crafted',
          label: 'Crafted Goods',
          content: inventoryPanel(
            craftedGoods,
            'Artisan Output',
            'Refined and created by your blacksmiths, carpenters, and cooks. Crafted products require refined raw ingredients from corresponding gathering tiers to produce.',
          ),
        },
      ]}
    />
  );
}

export const inventoryPage = definePage({
  id: "inventory",
  path: "/inventory",
  title: "Inventory",
  icon,
  background,
  children: <InventoryComponent />,
});
