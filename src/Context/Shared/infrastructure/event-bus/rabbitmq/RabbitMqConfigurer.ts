import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../../domain/DomainEventSubscriber";
import { RabbitMqConnection } from "./RabbitMqConnection";

export class RabbitMqConfigurer {
  constructor(private connection: RabbitMqConnection) {}

  async configure(params: {
    exchange: string;
    subscribers: Array<DomainEventSubscriber<DomainEvent>>;
  }) {
    const deadLetterExchange = `dead_letter-${params.exchange}`;

    await this.connection.exchange(params.exchange);
    await this.connection.exchange(deadLetterExchange);

    for (const subscriber of params.subscribers) {
      await this.addQueue(subscriber, params.exchange);
    }
  }

  async addQueue(
    subscriber: DomainEventSubscriber<DomainEvent>,
    exchange: string
  ) {
    const deadLetterExchange = `dead_letter-${exchange}`;

    const routingKeys = this.getRoutingKeys(subscriber);

    const queue = this.formatQueueName(subscriber);
    const deadLetterQueue = this.formatDeadLetterQueueName(subscriber);

    await this.connection.queue({
      routingKeys,
      name: queue,
      exchange,
    });

    await this.connection.queue({
      routingKeys: [queue],
      name: deadLetterQueue,
      exchange: deadLetterExchange,
    });
  }

  private getRoutingKeys(subscriber: DomainEventSubscriber<DomainEvent>) {
    const routingKeys = subscriber
      .subscribedTo()
      .map((event) => event.EVENT_NAME);

    const queue = this.formatQueueName(subscriber);
    routingKeys.push(queue);
    return routingKeys;
  }

  private formatQueueName(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name;
    const name = value
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
    return `miarte.${name}`;
  }

  private formatDeadLetterQueueName(
    subscriber: DomainEventSubscriber<DomainEvent>
  ) {
    const queue = this.formatQueueName(subscriber);
    return `dead_letter.${queue}`;
  }
}
