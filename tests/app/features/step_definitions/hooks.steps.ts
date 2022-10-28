import { AfterAll, BeforeAll } from "@cucumber/cucumber";

import container from "../../../../src/app/dependency-injection";
import { CONTAINER_TYPES } from "../../../../src/app/dependency-injection/types";
import { MiArteApp } from "../../../../src/app/MiArteApp";
import { EventBus } from "../../../../src/Context/Shared/domain/EventBus";
import { EnvironmentArranger } from "../../../Context/Shared/infrastructure/arranger/EnvironmentArranger";

let application: MiArteApp;
let environmentArranger: EnvironmentArranger;
let eventBus: EventBus;

BeforeAll(async () => {
  environmentArranger = container.get<EnvironmentArranger>(
    CONTAINER_TYPES.EnvironmentArranger
  );
  eventBus = container.get<EventBus>(CONTAINER_TYPES.EventBus);

  await environmentArranger.arrange();

  application = new MiArteApp();
  await application.start();
});

AfterAll(async () => {
  await environmentArranger.close();
  await application.stop();
});

export { application, environmentArranger, eventBus };
