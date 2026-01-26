import type { RouteObject } from "react-router-dom";
import { MainMenu } from "../features/menu/MainMenu";
import { CreateCasino } from "../features/create-casino/CreateCasino";
import { CasinoEditor } from "../features/casino-editor/CasinoEditor";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainMenu />,
  },
  {
    path: "/create-casino",
    element: <CreateCasino />,
  },
  {
    path: "/editor/:casinoId",
    element: <CasinoEditor />,
  },
];
