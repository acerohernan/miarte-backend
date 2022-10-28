import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { DomainEventClass } from "../../../Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { UserCreatedDomainEvent } from "../../../User/domain/events/UserCreatedDomainEvent";
import { UserStepsCreator } from "./UserStepsCreator";

@injectable()
export class CreateUserStepsOnUserCreated
  implements DomainEventSubscriber<UserCreatedDomainEvent>
{
  constructor(
    @inject(CONTAINER_TYPES.UserStepsCreator) private creator: UserStepsCreator
  ) {}
  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }
  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const { aggregateId } = domainEvent;

    await this.creator.run({ user_id: aggregateId });
  }
}
