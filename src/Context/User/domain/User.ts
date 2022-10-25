import { AgregateRoot } from "../../Shared/domain/AggregateRoot";
import { Nullable } from "../../Shared/domain/Nullable";
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
  send_special_offers: boolean;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;
};

export type UserProperties = {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  username: UserUsername;
  description: Nullable<string>;
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

export class User extends AgregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;
  password: UserPassword;
  readonly username: UserUsername;

  readonly description: Nullable<string>;
  readonly copyright_name: Nullable<string>;
  readonly copyright_url: Nullable<string>;
  readonly name: Nullable<string>;
  readonly surname: Nullable<string>;

  readonly send_special_offers: boolean;
  readonly visible_real_name: boolean;
  readonly show_age_in_profile: boolean;
  readonly show_city_and_country_in_profile: boolean;
  readonly allow_users_message_me: boolean;
  readonly marketing_off_site: boolean;

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
    });
  }

  static create(properties: UserProperties): User {
    const user = new User(properties);

    //CREATE THE "USER.CREATED" EVENT

    return user;
  }

  changePassword(password: UserPassword) {
    //SEND THE "USER.PASSWORD.CHANGED" EVENT

    this.password = password;
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
    };
  }
}
