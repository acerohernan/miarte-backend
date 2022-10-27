import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exception/NotFoundException";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/value-object/UserId";

type Params = {
  id: string;
  name: string;
  surname: string;
  description: string;
  copyright_name: string;
  copyright_url: string;
  profile_url: string;
  banner_url: string;
  visible_real_name: boolean;
  show_age_in_profile: boolean;
  show_city_and_country_in_profile: boolean;
  allow_users_message_me: boolean;
  marketing_off_site: boolean;
  send_special_offers: boolean;
};

@injectable()
export class UserInformationUpdater {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params) {
    const user = await this.repository.search(new UserId(params.id));

    if (!user) throw new NotFoundException("Not found the user information");

    user.updateProfileInformation({
      name: params.name || null,
      description: params.description || null,
      banner_url: params.banner_url || null,
      profile_url: params.profile_url || null,
      copyright_name: params.copyright_name || null,
      copyright_url: params.copyright_url || null,
      surname: params.surname || null,
      allow_users_message_me: Boolean(params.allow_users_message_me),
      marketing_off_site: Boolean(params.marketing_off_site),
      send_special_offers: Boolean(params.send_special_offers),
      show_age_in_profile: Boolean(params.show_age_in_profile),
      show_city_and_country_in_profile: Boolean(
        params.show_city_and_country_in_profile
      ),
      visible_real_name: Boolean(params.visible_real_name),
    });

    await this.repository.save(user);
  }
}
