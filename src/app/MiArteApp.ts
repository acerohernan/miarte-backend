import "reflect-metadata";
import { DomainEventSubscribers } from "../Context/Shared/domain/DomainEventSubscribers";
import config from "../Context/Shared/infrastructure/config";
import { RabbitMqConfigurer } from "../Context/Shared/infrastructure/event-bus/rabbitmq/RabbitMqConfigurer";
import { RabbitMqConnection } from "../Context/Shared/infrastructure/event-bus/rabbitmq/RabbitMqConnection";
import { TypeOrmClientFactory } from "../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import container from "./dependency-injection";
import { Server } from "./server";

export class MiArteApp {
  server?: Server;

  async start() {
    const port = config.port || "5000";
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
    const connection = new RabbitMqConnection();
    await connection.connect();

    const subscribers = DomainEventSubscribers.from(container).items;

    const configurer = new RabbitMqConfigurer(connection);
    await configurer.configure({ exchange: "domain_events", subscribers });
  }

  async connectDatabase() {
    return TypeOrmClientFactory.createClient();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }
}
