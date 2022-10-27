import { ConsumeMessage } from "amqplib";
import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../../domain/DomainEventSubscriber";
import { DomainEventDeserializer } from "../DomainEventDeserializer";
import { RabbitMqConnection } from "./RabbitMqConnection";

type RabbitMqConsumerParams = {
  queue: string;
  exchange: string;
  subscriber: DomainEventSubscriber<DomainEvent>;
  deserializer: DomainEventDeserializer;
  connection: RabbitMqConnection;
};

export class RabbitMqConsumer {
  private exchange: string;
  private queue: string;
  private subscriber: DomainEventSubscriber<DomainEvent>;
  private deserializer: DomainEventDeserializer;
  private connection: RabbitMqConnection;

  constructor(params: RabbitMqConsumerParams) {
    this.subscriber = params.subscriber;
    this.deserializer = params.deserializer;
    this.connection = params.connection;
    this.queue = params.queue;
    this.exchange = params.exchange;
  }

  //onMessage
  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString();
    const domainEvent = this.deserializer.deserialize(content);

    try {
      await this.subscriber.on(domainEvent);
    } catch (error) {
      await this.deadLetter(message);
    } finally {
      this.connection.ack(message);
    }
  }

  private async deadLetter(message: ConsumeMessage) {
    await this.connection.deadLetter(message, this.queue, this.exchange);
  }
}
