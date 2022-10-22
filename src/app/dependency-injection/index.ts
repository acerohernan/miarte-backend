import { Container } from "inversify";
import { UserSignuper } from "../../Context/User/application/UserSignuper";
import { UserRepository } from "../../Context/User/domain/UserRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/TypeOrmUserRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { UserSignUpPostController } from "../controllers/user/UserSignUpPostController";
import { CONTAINER_TYPES } from "./types";

const container = new Container();

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
 * UserSignuper
 * @description Application Service to signup a user
 * @author acerohernan
 */
container.bind<UserSignuper>(CONTAINER_TYPES.UserSignuper).to(UserSignuper);

/* INFRAESTRUCTURE */

/**
 * UserRepository
 * @description Repository for user entity
 * @author acerohernan
 */
container
  .bind<UserRepository>(CONTAINER_TYPES.UserRepository)
  .to(TypeOrmUserRepository);

export default container;
