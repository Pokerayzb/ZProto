import { Overlay } from "@components/Overlay";
import { NavigationProvider } from "@navigation/NavigationProvider";

import { PageOutlet } from "./PageOutlet";

export function App() {
  return (
    <NavigationProvider>
      <div className="relative min-h-dvh w-full overflow-hidden bg-app-bg">
        <div className="relative z-0 min-h-dvh w-full">
          <PageOutlet />
        </div>
        <Overlay />
      </div>
    </NavigationProvider>
  );
}
