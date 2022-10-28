import { DomainEvent } from "../../../../src/Context/Shared/domain/DomainEvent";
import { DomainEventSubscribers } from "../../../../src/Context/Shared/domain/DomainEventSubscribers";
import { EventBus } from "../../../../src/Context/Shared/domain/EventBus";

export class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: DomainEvent[]): Promise<void> {
    this.publishSpy(events);
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {}

  assertLastPublishedEventIs(exceptedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][0];

    const expected = this.getDataFormDomainEvent(exceptedEvent);
    const published = this.getDataFormDomainEvent(lastPublishedEvent);

    expect(expected).toMatchObject(published);
  }

  private getDataFormDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...atributes } = event;

    return atributes;
  }
}
