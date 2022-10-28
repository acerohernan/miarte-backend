import { DomainEventSubscribers } from "../../Context/Shared/domain/DomainEventSubscribers";
import { RabbitMqConfigurer } from "../../Context/Shared/infrastructure/event-bus/rabbitmq/RabbitMqConfigurer";
import { RabbitMqConnection } from "../../Context/Shared/infrastructure/event-bus/rabbitmq/RabbitMqConnection";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";

export class ConfigureRabbitMqCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>(
      CONTAINER_TYPES.RabbitMqConnection
    );

    await connection.connect();

    const configurer = new RabbitMqConfigurer(connection);

    const subscribers = DomainEventSubscribers.from(container).items;
    await configurer.configure({ exchange: "domain_events", subscribers });

    await connection.close();
  }
}
