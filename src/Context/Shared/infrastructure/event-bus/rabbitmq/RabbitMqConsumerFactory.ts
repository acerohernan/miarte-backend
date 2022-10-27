import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../../domain/DomainEventSubscriber";
import { DomainEventDeserializer } from "../DomainEventDeserializer";
import { RabbitMqConnection } from "./RabbitMqConnection";
import { RabbitMqConsumer } from "./RabbitMqConsumer";

export class RabbitMqConsumerFactory {
  constructor(
    private connection: RabbitMqConnection,
    private deserializer: DomainEventDeserializer
  ) {}

  build(
    subscriber: DomainEventSubscriber<DomainEvent>,
    exchange: string,
    queue: string
  ): RabbitMqConsumer {
    return new RabbitMqConsumer({
      connection: this.connection,
      deserializer: this.deserializer,
      queue,
      subscriber,
      exchange,
    });
  }
}
