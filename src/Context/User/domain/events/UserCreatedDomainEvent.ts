import { DomainEvent } from "../../../Shared/domain/DomainEvent";
import { Nullable } from "../../../Shared/domain/Nullable";

type UserCreatedDomainEventAttributes = {
  email: string;
  password: string;
  username: string;
  description: Nullable<string>;
  copyright_name: Nullable<string>;
  copyright_url: Nullable<string>;
  name: Nullable<string>;
  surname: Nullable<string>;
  profile_url: Nullable<string>;
  banner_url: Nullable<string>;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  send_special_offers: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;
};
type Params = {
  aggregateId: string;
  email: string;
  password: string;
  username: string;
  description: Nullable<string>;
  copyright_name: Nullable<string>;
  copyright_url: Nullable<string>;
  name: Nullable<string>;
  surname: Nullable<string>;
  profile_url: Nullable<string>;
  banner_url: Nullable<string>;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  send_special_offers: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;
  eventId?: string;
  occurredOn?: Date;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static EVENT_NAME: string = "miarte.user.event.1.user.created";

  readonly email: string;
  readonly password: string;
  readonly username: string;

  readonly description: Nullable<string>;
  readonly copyright_name: Nullable<string>;
  readonly copyright_url: Nullable<string>;
  readonly name: Nullable<string>;
  readonly surname: Nullable<string>;
  readonly profile_url: Nullable<string>;
  readonly banner_url: Nullable<string>;

  readonly send_special_offers: boolean;
  readonly visible_real_name: boolean;
  readonly show_age_in_profile: boolean;
  readonly show_city_and_country_in_profile: boolean;
  readonly allow_users_message_me: boolean;
  readonly marketing_off_site: boolean;

  constructor(params: Params) {
    super({
      aggregateId: params.aggregateId,
      eventName: UserCreatedDomainEvent.EVENT_NAME,
      eventId: params.eventId,
      occurredOn: params.occurredOn,
    });
    this.email = params.email;
    this.password = params.password;
    this.username = params.username;

    this.description = params.description;
    this.copyright_name = params.copyright_name;
    this.copyright_url = params.copyright_url;
    this.name = params.name;
    this.surname = params.surname;
    this.profile_url = params.profile_url;
    this.banner_url = params.banner_url;

    this.send_special_offers = params.send_special_offers;
    this.visible_real_name = params.visible_real_name;
    this.show_age_in_profile = params.show_age_in_profile;
    this.show_city_and_country_in_profile =
      params.show_city_and_country_in_profile;
    this.allow_users_message_me = params.allow_users_message_me;
    this.marketing_off_site = params.marketing_off_site;
  }

  static fromPrimitives(primitives: {
    aggregateId: string;
    attributes: UserCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = primitives;

    return new UserCreatedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      email: attributes.email,
      password: attributes.password,
      username: attributes.username,
      description: attributes.description,
      copyright_name: attributes.copyright_name,
      copyright_url: attributes.copyright_url,
      name: attributes.name,
      surname: attributes.surname,
      profile_url: attributes.profile_url,
      banner_url: attributes.banner_url,
      visible_real_name: attributes.visible_real_name,
      show_age_in_profile: attributes.show_age_in_profile,
      show_city_and_country_in_profile:
        attributes.show_city_and_country_in_profile,
      send_special_offers: attributes.send_special_offers,
      allow_users_message_me: attributes.allow_users_message_me,
      marketing_off_site: attributes.marketing_off_site,
    });
  }

  toPrimitives(): UserCreatedDomainEventAttributes {
    return {
      email: this.email,
      password: this.password,
      username: this.username,
      description: this.description,
      copyright_name: this.copyright_name,
      copyright_url: this.copyright_url,
      name: this.name,
      surname: this.surname,
      profile_url: this.profile_url,
      banner_url: this.banner_url,
      visible_real_name: this.visible_real_name,
      show_age_in_profile: this.show_age_in_profile,
      show_city_and_country_in_profile: this.show_city_and_country_in_profile,
      send_special_offers: this.send_special_offers,
      allow_users_message_me: this.allow_users_message_me,
      marketing_off_site: this.marketing_off_site,
    };
  }
}
