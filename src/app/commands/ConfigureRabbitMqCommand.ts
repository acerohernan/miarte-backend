import { DomainEventSubscribers } from "../../Context/Shared/domain/DomainEventSubscribers";
import config from "../../Context/Shared/infrastructure/config";
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
    await configurer.configure({
      exchange: config.rabbitmq.exchangeName,
      subscribers,
    });

    await connection.close();
  }
}
