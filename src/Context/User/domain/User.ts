import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { Nullable } from "../../Shared/domain/Nullable";
import { UserCreatedDomainEvent } from "./events/UserCreatedDomainEvent";
import { UserEmail } from "./value-object/UserEmail";
import { UserId } from "./value-object/UserId";
import { UserPassword } from "./value-object/UserPassword";
import { UserUsername } from "./value-object/UserUsername";

export type UserPrimitives = {
  id: string;
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

export type UserProperties = {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  username: UserUsername;
  description: Nullable<string>;
  profile_url: Nullable<string>;
  banner_url: Nullable<string>;
  copyright_name: Nullable<string>;
  copyright_url: Nullable<string>;
  name: Nullable<string>;
  surname: Nullable<string>;
  send_special_offers: boolean;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;
};

type UserProfileProperties = {
  description: Nullable<string>;
  profile_url: Nullable<string>;
  banner_url: Nullable<string>;
  copyright_name: Nullable<string>;
  copyright_url: Nullable<string>;
  name: Nullable<string>;
  surname: Nullable<string>;
  send_special_offers: boolean;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;
};

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;
  password: UserPassword;
  readonly username: UserUsername;

  description: Nullable<string>;
  copyright_name: Nullable<string>;
  copyright_url: Nullable<string>;
  name: Nullable<string>;
  surname: Nullable<string>;
  profile_url: Nullable<string>;
  banner_url: Nullable<string>;

  send_special_offers: boolean;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;

  constructor(params: UserProperties) {
    super();
    this.id = params.id;
    this.email = params.email;
    this.password = params.password;
    this.username = params.username;
    this.description = params.description;
    this.copyright_name = params.copyright_name;
    this.copyright_url = params.copyright_url;
    this.name = params.name;
    this.surname = params.surname;
    this.banner_url = params.banner_url;
    this.profile_url = params.profile_url;
    this.send_special_offers = params.send_special_offers;
    this.visible_real_name = params.visible_real_name;
    this.show_age_in_profile = params.show_age_in_profile;
    this.show_city_and_country_in_profile =
      params.show_city_and_country_in_profile;
    this.allow_users_message_me = params.allow_users_message_me;
    this.marketing_off_site = params.marketing_off_site;
  }

  static fromPrimitives(primitives: UserPrimitives): User {
    return new User({
      id: new UserId(primitives.id),
      email: new UserEmail(primitives.email),
      password: new UserPassword(primitives.password),
      username: new UserUsername(primitives.username),
      description: primitives.description,
      copyright_name: primitives.copyright_name,
      copyright_url: primitives.copyright_url,
      name: primitives.name,
      surname: primitives.surname,
      send_special_offers: primitives.send_special_offers,
      visible_real_name: primitives.visible_real_name,
      show_age_in_profile: primitives.show_age_in_profile,
      show_city_and_country_in_profile:
        primitives.show_city_and_country_in_profile,
      allow_users_message_me: primitives.allow_users_message_me,
      marketing_off_site: primitives.marketing_off_site,
      banner_url: primitives.banner_url,
      profile_url: primitives.profile_url,
    });
  }

  static create(properties: UserProperties): User {
    const user = new User(properties);

    user.record(
      new UserCreatedDomainEvent({
        aggregateId: user.id.value,
        email: user.email.value,
        password: user.password.value,
        username: user.username.value,
        description: user.description,
        copyright_name: user.copyright_name,
        copyright_url: user.copyright_url,
        name: user.name,
        surname: user.surname,
        profile_url: user.profile_url,
        banner_url: user.banner_url,
        visible_real_name: user.visible_real_name,
        show_age_in_profile: user.show_age_in_profile,
        show_city_and_country_in_profile: user.show_city_and_country_in_profile,
        send_special_offers: user.send_special_offers,
        allow_users_message_me: user.allow_users_message_me,
        marketing_off_site: user.marketing_off_site,
      })
    );

    return user;
  }

  changePassword(password: UserPassword) {
    this.password = password;
  }

  updateProfileInformation(profile: UserProfileProperties) {
    this.description = profile.description;
    this.copyright_name = profile.copyright_name;
    this.copyright_url = profile.copyright_url;
    this.name = profile.name;
    this.surname = profile.surname;
    this.banner_url = profile.banner_url;
    this.profile_url = profile.profile_url;
    this.send_special_offers = profile.send_special_offers;
    this.visible_real_name = profile.visible_real_name;
    this.show_age_in_profile = profile.show_age_in_profile;
    this.show_city_and_country_in_profile =
      profile.show_city_and_country_in_profile;
    this.allow_users_message_me = profile.allow_users_message_me;
    this.marketing_off_site = profile.marketing_off_site;
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      description: this.description,
      copyright_name: this.copyright_name,
      copyright_url: this.copyright_url,
      name: this.name,
      surname: this.surname,
      send_special_offers: this.send_special_offers,
      visible_real_name: this.visible_real_name,
      show_age_in_profile: this.show_age_in_profile,
      show_city_and_country_in_profile: this.show_city_and_country_in_profile,
      allow_users_message_me: this.allow_users_message_me,
      marketing_off_site: this.marketing_off_site,
      banner_url: this.banner_url,
      profile_url: this.profile_url,
    };
  }
}
