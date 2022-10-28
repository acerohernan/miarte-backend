import { Container } from "inversify";
import { CONTAINER_TYPES } from "../../../app/dependency-injection/types";
import { DomainEvent } from "./DomainEvent";
import { DomainEventSubscriber } from "./DomainEventSubscriber";

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

  static from(container: Container): DomainEventSubscribers {
    const subscribers = container.getAll<DomainEventSubscriber<DomainEvent>>(
      CONTAINER_TYPES.DomainEventSubscriber
    );
    return new DomainEventSubscribers(subscribers);
  }
}
