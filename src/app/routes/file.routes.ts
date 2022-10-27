import { Router } from "express";
import { FileImagePostController } from "../controllers/file/FileImagePostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";
import { checkAuth } from "../middlewares/checkAuth";

export function register(router: Router) {
  const fileImagePostController = container.get<FileImagePostController>(
    CONTAINER_TYPES.FileImagePostController
  );
  router.post("/file/image/upload", checkAuth, (req, res) =>
    fileImagePostController.run(req, res)
  );
}
