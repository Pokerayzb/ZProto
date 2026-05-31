import { Overlay } from '@components/Overlay';
import { GameProvider } from '@game/context/GameProvider';
import { FactionVisitProvider } from '@game/factions/useFactionVisit';
import { NavigationProvider } from '@navigation/NavigationProvider';
import { GameStageProvider } from '@engine/stage/GameStageProvider';

import { PageOutlet } from './PageOutlet';

export function App() {
  return (
    <GameProvider>
      <NavigationProvider>
        <FactionVisitProvider>
          <GameStageProvider>
            <div className="relative min-h-dvh w-full overflow-hidden bg-app-bg">
              <div className="relative z-0 min-h-dvh w-full">
                <PageOutlet />
              </div>
              <Overlay />
            </div>
          </GameStageProvider>
        </FactionVisitProvider>
      </NavigationProvider>
    </GameProvider>
  );
}
