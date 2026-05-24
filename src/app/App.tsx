import { Overlay } from "@components/Overlay";
import { NavigationProvider } from "@navigation/NavigationProvider";

import { PageOutlet } from "./PageOutlet";
import "./App.css";

export function App() {
  return (
    <NavigationProvider>
      <div className="app-shell">
        <div className="app-shell__page">
          <PageOutlet />
        </div>
        <Overlay />
      </div>
    </NavigationProvider>
  );
}
