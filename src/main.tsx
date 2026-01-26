import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/App.tsx";
import { createBrowserRouter, BrowserRouter } from "react-router-dom";
import "pixel-retroui/dist/index.css";
import "pixel-retroui/dist/fonts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
