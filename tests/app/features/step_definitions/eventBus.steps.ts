import { Given } from "@cucumber/cucumber";
import container from "../../../../src/app/dependency-injection";
import { DomainEventSubscribers } from "../../../../src/Context/Shared/domain/DomainEventSubscribers";
import { DomainEventDeserializer } from "../../../../src/Context/Shared/infrastructure/event-bus/DomainEventDeserializer";
import { eventBus } from "./hooks.steps";

const deserializer = buildDeserializer();

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);
  return DomainEventDeserializer.configure(subscribers);
}

Given("the following event is received:", async (event: string) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent]);
  await wait(300);
});

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
