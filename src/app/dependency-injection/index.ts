import { Container } from "inversify";
import { EnvironmentArranger } from "../../../tests/Context/infrastructure/arranger/EnvironmentArranger";
import { TypeOrmEnvironmentArranger } from "../../../tests/Context/infrastructure/typeorm/TypeOrmEnvironmentArranger";
import { UserAuthenticator } from "../../Context/User/application/user-login/UserAuthenticator";
import { UserSignuper } from "../../Context/User/application/user-signup/UserSignuper";
import { UserRepository } from "../../Context/User/domain/UserRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/TypeOrmUserRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { UserLoginPostController } from "../controllers/user/UserLoginPostController";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
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
