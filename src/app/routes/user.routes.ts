import { Router } from "express";
import { UserForgotPasswordPostController } from "../controllers/user/UserForgotPasswordPostController";
import { UserGetController } from "../controllers/user/UserGetController";
import { UserInformationPutController } from "../controllers/user/UserInformationPutController";
import { UserLoginPostController } from "../controllers/user/UserLoginPostController";
import { UserRestorePasswordPostController } from "../controllers/user/UserRestorePasswordPostController";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
import { UserVerifyForgotPasswordGetController } from "../controllers/user/UserVerifyForgotPasswordGetController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";
import { checkAuth } from "../middlewares/checkAuth";

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

  const userRestorePasswordPostController =
    container.get<UserRestorePasswordPostController>(
      CONTAINER_TYPES.UserRestorePasswordPostController
    );
  router.post("/user/auth/password/restore", (req, res) =>
    userRestorePasswordPostController.run(req, res)
  );

  const userGetController = container.get<UserGetController>(
    CONTAINER_TYPES.UserGetController
  );
  router.get("/user/information", checkAuth, (req, res) =>
    userGetController.run(req, res)
  );

  const userInformationPutController =
    container.get<UserInformationPutController>(
      CONTAINER_TYPES.UserInformationPutController
    );
  router.put("/user/information", checkAuth, (req, res) =>
    userInformationPutController.run(req, res)
  );
}
