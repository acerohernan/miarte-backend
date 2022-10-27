import { Container } from "inversify";
import { DomainEvent } from "./DomainEvent";
import { DomainEventSubscriber } from "./DomainEventSubscriber";

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

  static from(container: Container): DomainEventSubscribers {
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];
    return new DomainEventSubscribers(subscribers);
  }
}
