import { Router } from "express";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";

export function register(router: Router) {
  const userSignUpPostController = container.get<UserSignUpPostController>(
    CONTAINER_TYPES.UserSignUpPostController
  );
  router.post("/user/auth/signup", (req, res) =>
    userSignUpPostController.run(req, res)
  );
}
