import { DomainEvent } from "./DomainEvent";

export type AggregateRootPrimitives = {
  id: string;
};

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(domainEvent: DomainEvent) {
    this.domainEvents.push(domainEvent);
  }

  abstract toPrimitives(): any;
}
