import { Book } from '@components/Book';

import { definePage } from '../definePage';

import background from './assets/background.png';
import icon from './assets/icon.png';

export const craftPage = definePage({
  id: "craft",
  path: "/craft",
  title: "Craft",
  icon,
  background,
  children: (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <Book className="min-h-0 flex-1" />
    </div>
  ),
});
