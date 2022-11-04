import { Router } from "express";
import { UserForgotPasswordPostController } from "../controllers/user/UserForgotPasswordPostController";
import { UserGetController } from "../controllers/user/UserGetController";
import { UserInformationPutController } from "../controllers/user/UserInformationPutController";
import { UserLoginPostController } from "../controllers/user/UserLoginPostController";
import { UserRestorePasswordPostController } from "../controllers/user/UserRestorePasswordPostController";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
import { UserStepsGetController } from "../controllers/user/UserStepsGetController";
import { UserVerifyForgotPasswordPostController } from "../controllers/user/UserVerifyForgotPasswordPostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";
import { checkAuth } from "../middlewares/checkAuth";

export function register(router: Router) {
  const userSignUpPostController = container.get<UserSignUpPostController>(
    CONTAINER_TYPES.UserSignUpPostController
  );
  router.post("/api/user/auth/signup", (req, res) =>
    userSignUpPostController.run(req, res)
  );

  const userLoginPostController = container.get<UserLoginPostController>(
    CONTAINER_TYPES.UserLoginPostController
  );
  router.post("/api/user/auth/login", (req, res) =>
    userLoginPostController.run(req, res)
  );

  const userForgotPasswordPostController =
    container.get<UserForgotPasswordPostController>(
      CONTAINER_TYPES.UserForgotPasswordPostController
    );
  router.post("/api/user/auth/password/forgot", (req, res) =>
    userForgotPasswordPostController.run(req, res)
  );

  const userVerifyForgotPasswordPostController =
    container.get<UserVerifyForgotPasswordPostController>(
      CONTAINER_TYPES.UserVerifyForgotPasswordPostController
    );
  router.post("/api/user/auth/password/verify-code", (req, res) =>
    userVerifyForgotPasswordPostController.run(req, res)
  );

  const userRestorePasswordPostController =
    container.get<UserRestorePasswordPostController>(
      CONTAINER_TYPES.UserRestorePasswordPostController
    );
  router.post("/api/user/auth/password/restore", (req, res) =>
    userRestorePasswordPostController.run(req, res)
  );

  const userGetController = container.get<UserGetController>(
    CONTAINER_TYPES.UserGetController
  );
  router.get("/api/user/information", checkAuth, (req, res) =>
    userGetController.run(req, res)
  );

  const userInformationPutController =
    container.get<UserInformationPutController>(
      CONTAINER_TYPES.UserInformationPutController
    );
  router.put("/api/user/information", checkAuth, (req, res) =>
    userInformationPutController.run(req, res)
  );

  /* User Steps */
  const userStepsGetController = container.get<UserStepsGetController>(
    CONTAINER_TYPES.UserStepsGetController
  );
  router.get("/api/user/steps", checkAuth, (req, res) =>
    userStepsGetController.run(req, res)
  );
}
