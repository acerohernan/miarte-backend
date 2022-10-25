import { Router } from "express";
import { UserForgotPasswordPostController } from "../controllers/user/UserForgotPasswordPostController";
import { UserLoginPostController } from "../controllers/user/UserLoginPostController";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
import { UserVerifyForgotPasswordGetController } from "../controllers/user/UserVerifyForgotPasswordGetController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";

export function register(router: Router) {
  const userSignUpPostController = container.get<UserSignUpPostController>(
    CONTAINER_TYPES.UserSignUpPostController
  );
  router.post("/user/auth/signup", (req, res) =>
    userSignUpPostController.run(req, res)
  );

  const userLoginPostController = container.get<UserLoginPostController>(
    CONTAINER_TYPES.UserLoginPostController
  );
  router.post("/user/auth/login", (req, res) =>
    userLoginPostController.run(req, res)
  );

  const userForgotPasswordPostController =
    container.get<UserForgotPasswordPostController>(
      CONTAINER_TYPES.UserForgotPasswordPostController
    );
  router.post("/user/auth/password/forgot", (req, res) =>
    userForgotPasswordPostController.run(req, res)
  );

  const userVerifyForgotPasswordGetController =
    container.get<UserVerifyForgotPasswordGetController>(
      CONTAINER_TYPES.UserVerifyForgotPasswordGetController
    );
  router.get("/user/auth/password/verify-code", (req, res) =>
    userVerifyForgotPasswordGetController.run(req, res)
  );
}
