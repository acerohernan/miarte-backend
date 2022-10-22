import { Container } from "inversify";
import { UserSignuper } from "../../Context/User/application/UserSignuper";
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
export default container;
