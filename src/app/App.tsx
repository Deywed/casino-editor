import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./router";
// import {} from "./../../pixel-retroui-setup.js";

export const App = () => {
  const element = useRoutes(routes);
  return element;
};
