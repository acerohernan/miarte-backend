import { User } from "../../../../src/Context/User/domain/User";

export class UserMother {
  static random(): User {
    return User.fromPrimitives({
      id: "087bc25a-4213-4cff-bc1e-3b04bfd6b97a",
      email: "test@test.com",
      password: "Password1",
      username: "username",
      copyright_name: null,
      copyright_url: null,
      description: null,
      name: null,
      surname: null,
      banner_url: null,
      profile_url: null,
      allow_users_message_me: false,
      marketing_off_site: false,
      send_special_offers: false,
      show_age_in_profile: false,
      show_city_and_country_in_profile: false,
      visible_real_name: false,
    });
  }
}
