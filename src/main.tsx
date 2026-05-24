import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/noto-serif/cyrillic.css";
import "@fontsource/noto-serif/latin.css";
import "@fontsource/zen-old-mincho/latin.css";

import { App } from "./app/App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
