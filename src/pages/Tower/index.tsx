import { Building } from './Building';
import { definePage } from '../definePage';

import background from './assets/background.png';
import icon from './assets/icon.png';

export const towerPage = definePage({
  id: "tower",
  path: "/tower",
  title: "Башня",
  icon,
  background,
  children: (
    <Building
      anchorY={52}
      roomCoordinates={{
        kitchen: { x: 35, y: 80 },
        carpentry: { x: 35, y: 61 },
        blacksmith: { x: 35, y: 42 },
      }}
    />
  ),
});
