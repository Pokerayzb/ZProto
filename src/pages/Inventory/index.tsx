import { Book } from '@components/Book';
import { Chapter } from '@components/Book/Chapter';
import { Column } from '@components/Book/Column';
import { ScrollArea } from '@components/ScrollArea';
import { Frame } from '@components/Frame';

import { gameLibrary } from '@game/library/gameLibrary';
import { useGameState } from '@game/hooks/useGameState';
import { definePage } from '../definePage';

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
    return (
      <div className="grid grid-cols-2 gap-3.5 pr-1 py-1">
        {itemsList.map((item) => {
          const qty = inventory[item.id] ?? 0;
          return (
            <Frame
              key={item.id}
              className={
                'flex items-center gap-3.5 border border-page-text/10 bg-page-text/15 p-3 transition-all' +
                (qty > 0 ? ' border-page-text/30 shadow-sm' : ' opacity-40 grayscale')
              }
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded border border-page-text/10 bg-page-text/20 p-1">
                <img src={item.icon} alt={item.name} className="size-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-serif text-base font-bold leading-tight">{item.name}</h4>
                <p className="mt-0.5 truncate text-xs leading-tight opacity-65" title={item.description}>
                  {item.description}
                </p>
              </div>
              <div className="shrink-0 rounded border border-page-text/15 bg-page-text/5 px-2 py-0.5 font-mono text-lg font-bold">
                x{qty}
              </div>
            </Frame>
          );
        })}
      </div>
    );
  }

  return (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <Book name="Inventory" className="min-h-0 flex-1">
        <Chapter id="raw" label="Raw Materials">
          <Column className="col-span-2">
            <ScrollArea>{renderItemGrid(rawMaterials)}</ScrollArea>
          </Column>
          <Column className="flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mb-3 font-serif text-2xl font-bold">Resource Stockpile</h3>
              <p className="text-sm leading-relaxed opacity-75">
                Raw goods gathered from the river, mine, and forests. These materials require no ingredients to collect but serve as the vital foundation for all your crafting recipes.
              </p>
            </div>
          </Column>
        </Chapter>

        <Chapter id="crafted" label="Crafted Goods">
          <Column className="col-span-2">
            <ScrollArea>{renderItemGrid(craftedGoods)}</ScrollArea>
          </Column>
          <Column className="flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="mb-3 font-serif text-2xl font-bold">Artisan Output</h3>
              <p className="text-sm leading-relaxed opacity-75">
                Refined and created by your blacksmiths, carpenters, and cooks. Crafted products require refined raw ingredients from corresponding gathering tiers to produce.
              </p>
            </div>
          </Column>
        </Chapter>
      </Book>
    </div>
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
