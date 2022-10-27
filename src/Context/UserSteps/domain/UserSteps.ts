import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { UserId } from "../../User/domain/value-object/UserId";
import { UserStepsId } from "./value-object/UserStepsId";

export type UserStepsPrimitives = {
  id: string;
  user_id: string;
  avatar_added: boolean;
  banner_added: boolean;
  social_networks_added: boolean;
  description_added: boolean;
  email_confirmed: boolean;
  name_and_address_added: boolean;
  payment_information_added: boolean;
  updated_at: Date;
};

export type UserStepsProperties = {
  id: UserStepsId;
  user_id: UserId;
  avatar_added: boolean;
  banner_added: boolean;
  social_networks_added: boolean;
  description_added: boolean;
  email_confirmed: boolean;
  name_and_address_added: boolean;
  payment_information_added: boolean;
  updated_at: Date;
};

export class UserSteps extends AggregateRoot {
  readonly id: UserStepsId;
  readonly user_id: UserId;
  readonly avatar_added: boolean;
  readonly banner_added: boolean;
  readonly social_networks_added: boolean;
  readonly description_added: boolean;
  readonly email_confirmed: boolean;
  readonly name_and_address_added: boolean;
  readonly payment_information_added: boolean;
  readonly updated_at: Date;

  constructor(properties: UserStepsProperties) {
    super();
    this.id = properties.id;
    this.user_id = properties.user_id;
    this.avatar_added = properties.avatar_added;
    this.banner_added = properties.banner_added;
    this.social_networks_added = properties.social_networks_added;
    this.description_added = properties.description_added;
    this.email_confirmed = properties.email_confirmed;
    this.name_and_address_added = properties.name_and_address_added;
    this.payment_information_added = properties.payment_information_added;
    this.updated_at = properties.updated_at;
  }

  static create(properties: UserStepsProperties): UserSteps {
    const steps = new UserSteps(properties);
    return steps;
  }

  toPrimitives(): UserStepsPrimitives {
    return {
      id: this.id.value,
      user_id: this.user_id.value,
      avatar_added: this.avatar_added,
      banner_added: this.banner_added,
      social_networks_added: this.social_networks_added,
      description_added: this.description_added,
      email_confirmed: this.email_confirmed,
      name_and_address_added: this.name_and_address_added,
      payment_information_added: this.payment_information_added,
      updated_at: this.updated_at,
    };
  }

  static fromPrimtives(primitives: UserStepsPrimitives): UserSteps {
    return new UserSteps({
      id: new UserStepsId(primitives.id),
      user_id: new UserId(primitives.user_id),
      avatar_added: primitives.avatar_added,
      banner_added: primitives.banner_added,
      social_networks_added: primitives.social_networks_added,
      description_added: primitives.description_added,
      email_confirmed: primitives.email_confirmed,
      name_and_address_added: primitives.name_and_address_added,
      payment_information_added: primitives.payment_information_added,
      updated_at: primitives.updated_at,
    });
  }
}
