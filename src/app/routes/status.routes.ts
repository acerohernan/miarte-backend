import { Router } from "express";
import { StatusGetController } from "../controllers/status/StatusGetController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";

export function register(router: Router) {
  const statusGetController = container.get<StatusGetController>(
    CONTAINER_TYPES.StatusGetController
  );
  router.get("/api/status", (req, res) => statusGetController.run(req, res));
}
