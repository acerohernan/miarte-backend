import { Uuid } from "./Uuid";

type DomainEventAttributes = any;

type DomainEventPrimitives = {
  aggregateId: string;
  eventId: string;
  occurredOn: Date;
  attributes: DomainEventAttributes;
};

type DomainEventParams = {
  aggregateId: string;
  eventName: string;
  eventId?: string;
  occurredOn?: Date;
};

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (primitives: DomainEventPrimitives) => DomainEvent;

  readonly aggregateId: string;
  readonly eventName: string;
  readonly eventId: string;
  readonly occurredOn: Date;

  constructor(params: DomainEventParams) {
    this.aggregateId = params.aggregateId;
    this.eventName = params.eventName;
    this.eventId = params.eventId || Uuid.random().value;
    this.occurredOn = params.occurredOn || new Date();
  }

  abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(primitives: DomainEventPrimitives): DomainEvent;
};
