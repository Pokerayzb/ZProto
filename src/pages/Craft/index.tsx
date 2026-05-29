import { Book } from '@components/Book';
import { Chapter } from '@components/Book/Chapter';

import { gameLibrary } from '@game/library/gameLibrary';
import { definePage } from '../definePage';

import background from './assets/background.png';
import icon from './assets/icon.png';

const craftChapters = Object.values(gameLibrary.professions)
  .filter((p) => p.type === 'craft')
  .map((p) => ({ id: p.id, label: p.workshop.title }));

export const craftPage = definePage({
  id: "craft",
  path: "/craft",
  title: "Craft",
  icon,
  background,
  children: (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <Book name="Craft" className="min-h-0 flex-1">
        {craftChapters.map((c) => (
          <Chapter key={c.id} id={c.id} label={c.label}>
            <div className="p-4">{c.label} Layout Placeholder</div>
          </Chapter>
        ))}
      </Book>
    </div>
  ),
});
