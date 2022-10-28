import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../../app/dependency-injection/types";
import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../../domain/DomainEventSubscriber";
import { DomainEventSubscribers } from "../../../domain/DomainEventSubscribers";
import { EventBus } from "../../../domain/EventBus";
import { DomainEventDeserializer } from "../DomainEventDeserializer";
import { RabbitMqConnection } from "./RabbitMqConnection";
import { RabbitMqConsumerFactory } from "./RabbitMqConsumerFactory";

@injectable()
export class RabbitMqEventBus implements EventBus {
  private exchange: string = "domain_events";
  private moduleName: string = "miarte";

  constructor(
    @inject(CONTAINER_TYPES.RabbitMqConnection)
    private connection: RabbitMqConnection
  ) {}

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    await this.connectToRabbitMq();

    const deserializer = DomainEventDeserializer.configure(subscribers);
    const consumerFactory = new RabbitMqConsumerFactory(
      this.connection,
      deserializer
    );

    for (const subscriber of subscribers.items) {
      const queueName = this.formatQueueName(subscriber);
      const rabbitMqConsumer = consumerFactory.build(
        subscriber,
        this.exchange,
        queueName
      );

      await this.connection.consume(
        queueName,
        rabbitMqConsumer.onMessage.bind(rabbitMqConsumer)
      );
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    await this.connectToRabbitMq();

    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = this.toBuffer(event);
        const options = this.getOptions(event);

        await this.connection.publish({
          exchange: this.exchange,
          routingKey,
          content,
          options,
        });
      } catch (error: any) {
        console.log("Error to sending the event", event);
        console.log("Please implement and failover publisher");
      }
    }
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = JSON.stringify({
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        aggregateId: event.aggregateId,
        attributes: event.toPrimitives(),
      },
    });

    return Buffer.from(eventPrimitives);
  }

  private getOptions(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: "application/json",
      contentEncoding: "utf-8",
    };
  }

  private formatQueueName(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name;
    const name = value
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
    return `${this.moduleName}.${name}`;
  }

  private async connectToRabbitMq(): Promise<void> {
    if (this.connection.connectionExists()) return;

    await this.connection.connect();
  }

  private async disconnectToRabbitMq(): Promise<void> {
    if (!this.connection.connectionExists()) return;

    await this.connection.close();
  }
}
