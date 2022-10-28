import "reflect-metadata";
import { DomainEventSubscribers } from "../Context/Shared/domain/DomainEventSubscribers";
import { EventBus } from "../Context/Shared/domain/EventBus";
import { TypeOrmClientFactory } from "../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import container from "./dependency-injection";
import { CONTAINER_TYPES } from "./dependency-injection/types";
import { Server } from "./server";

export class MiArteApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || "5000";
    this.server = new Server(port);

    //configurations
    await this.connectDatabase();
    await this.confireEventBus();

    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  async confireEventBus() {
    const eventBus = container.get<EventBus>(CONTAINER_TYPES.EventBus);
    const subscribers = DomainEventSubscribers.from(container);
    await eventBus.addSubscribers(subscribers);
  }

  async connectDatabase() {
    return TypeOrmClientFactory.createClient();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }
}
