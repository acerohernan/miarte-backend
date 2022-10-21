import { Container } from "inversify";
import { StatusGetController } from "../controllers/status/StatusGetController";
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

export default container;
