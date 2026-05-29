import { Book } from '@components/Book';
import { Chapter } from '@components/Book/Chapter';

import { gameLibrary } from '@game/library/gameLibrary';
import { definePage } from '../definePage';

import background from './assets/background.png';
import icon from './assets/icon.png';

const gatheringChapters = Object.values(gameLibrary.professions)
  .filter((p) => p.type === 'gathering')
  .map((p) => ({ id: p.id, label: p.workshop.title }));

export const gatheringPage = definePage({
  id: "gathering",
  path: "/gathering",
  title: "Gathering",
  icon,
  background,
  children: (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <Book name="Gathering" className="min-h-0 flex-1">
        {gatheringChapters.map((c) => (
          <Chapter key={c.id} id={c.id} label={c.label}>
            <div className="p-4">{c.label} Layout Placeholder</div>
          </Chapter>
        ))}
      </Book>
    </div>
  ),
});
