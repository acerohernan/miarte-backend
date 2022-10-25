import { Container } from "inversify";
import { EnvironmentArranger } from "../../../tests/Context/Shared/infrastructure/arranger/EnvironmentArranger";
import { TypeOrmEnvironmentArranger } from "../../../tests/Context/Shared/infrastructure/typeorm/TypeOrmEnvironmentArranger";
import { UserForgotPasswordHandler } from "../../Context/User/application/user-forgot-password/UserForgotPasswordHandler";
import { UserAuthenticator } from "../../Context/User/application/user-login/UserAuthenticator";
import { UserPasswordRestorer } from "../../Context/User/application/user-restore-password/UserPasswordRestorer";
import { UserSignuper } from "../../Context/User/application/user-signup/UserSignuper";
import { UserForgotPasswordVerifier } from "../../Context/User/application/user-verify-forgot-password-code/UserForgotPasswordVerifier";
import { UserRepository } from "../../Context/User/domain/UserRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/TypeOrmUserRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { UserForgotPasswordPostController } from "../controllers/user/UserForgotPasswordPostController";
import { UserLoginPostController } from "../controllers/user/UserLoginPostController";
import { UserRestorePasswordPostController } from "../controllers/user/UserRestorePasswordPostController";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
import { UserVerifyForgotPasswordGetController } from "../controllers/user/UserVerifyForgotPasswordGetController";
import { CONTAINER_TYPES } from "./types";

const container = new Container();

/* CONTROLLERS */

/**
 * StatusGetController
 * @description Get the status of the server
 * @author acerohernan
 */
container
  .bind<StatusGetController>(CONTAINER_TYPES.StatusGetController)
  .to(StatusGetController);

/**
 * UserSignUpPostController
 * @description Rest Controller to create the user account
 * @author acerohernan
 */
container
  .bind<UserSignUpPostController>(CONTAINER_TYPES.UserSignUpPostController)
  .to(UserSignUpPostController);

/**
 * UserLoginPostController
 * @description Rest Controller to authenticate a user
 * @author acerohernan
 */
container
  .bind<UserLoginPostController>(CONTAINER_TYPES.UserLoginPostController)
  .to(UserLoginPostController);

/**
 * UserForgotPasswordPostController
 * @description Rest Controller to get the code to restore the password
 * @author acerohernan
 */
container
  .bind<UserForgotPasswordPostController>(
    CONTAINER_TYPES.UserForgotPasswordPostController
  )
  .to(UserForgotPasswordPostController);

/**
 * UserVerifyForgotPasswordGetController
 * @description Rest Controller to verify the forgot password code
 * @author acerohernan
 */
container
  .bind<UserVerifyForgotPasswordGetController>(
    CONTAINER_TYPES.UserVerifyForgotPasswordGetController
  )
  .to(UserVerifyForgotPasswordGetController);

/**
 * UserRestorePasswordPostController
 * @description Rest Controller to restore the user password with forgot password code
 * @author acerohernan
 */
container
  .bind<UserRestorePasswordPostController>(
    CONTAINER_TYPES.UserRestorePasswordPostController
  )
  .to(UserRestorePasswordPostController);

/* APPLICATION SERVICES */

/**
 * UserSignuper
 * @description Application Service to signup a user
 * @author acerohernan
 */
container.bind<UserSignuper>(CONTAINER_TYPES.UserSignuper).to(UserSignuper);

/**
 * UserAuthenticator
 * @description Application Service to authenticate an user
 * @author acerohernan
 */
container
  .bind<UserAuthenticator>(CONTAINER_TYPES.UserAuthenticator)
  .to(UserAuthenticator);

/**
 * UserForgotPasswordHandler
 * @description Application Service to handler when a user forgot his password
 * @author acerohernan
 */
container
  .bind<UserForgotPasswordHandler>(CONTAINER_TYPES.UserForgotPasswordHandler)
  .to(UserForgotPasswordHandler);

/**
 * UserForgotPasswordVerifier
 * @description Application Service to verify the forgot password code
 * @author acerohernan
 */
container
  .bind<UserForgotPasswordVerifier>(CONTAINER_TYPES.UserForgotPasswordVerifier)
  .to(UserForgotPasswordVerifier);

/**
 * UserPasswordRestorer
 * @description Application Service to to restore the password with the forgot password code
 * @author acerohernan
 */
container
  .bind<UserPasswordRestorer>(CONTAINER_TYPES.UserPasswordRestorer)
  .to(UserPasswordRestorer);

/* INFRAESTRUCTURE */

/**
 * UserRepository
 * @description Repository for user entity
 * @author acerohernan
 */
container
  .bind<UserRepository>(CONTAINER_TYPES.UserRepository)
  .to(TypeOrmUserRepository);

/**
 * EnvironmentArranger
 * @description An environment arranger for the tests features
 * @author acerohernan
 */
container
  .bind<EnvironmentArranger>(CONTAINER_TYPES.EnvironmentArranger)
  .to(TypeOrmEnvironmentArranger);

export default container;
