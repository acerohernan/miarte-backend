import { Router } from "express";
import fs from "fs";

export function registerRoutes(router: Router) {
  const filenames = fs.readdirSync(__dirname);
  const routes = filenames.filter((filename) => filename !== "index.ts");

  routes.map((route) => registerRoute(route, router));
}

function registerRoute(routeName: string, router: Router) {
  const path = `./${routeName.slice(0, routeName.length - 3)}`;
  const routeFile = require(path);
  routeFile.register(router);
}
