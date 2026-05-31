import { definePage } from '../definePage';
import { FactionVisit } from './FactionVisit';

import background from './assets/background.png';
import icon from './assets/icon.png';

export const zeppelinsPage = definePage({
  id: "zeppelins",
  path: "/zeppelins",
  title: "Zeppelins",
  icon,
  background,
  children: <FactionVisit />,
});
