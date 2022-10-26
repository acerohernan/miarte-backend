import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { DuplicatedEntityException } from "../../../Shared/domain/exception/DuplicatedEntityException";
import { Uuid } from "../../../Shared/domain/Uuid";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/value-object/UserEmail";
import { UserId } from "../../domain/value-object/UserId";
import { UserPassword } from "../../domain/value-object/UserPassword";
import { UserUsername } from "../../domain/value-object/UserUsername";

type Params = {
  id?: string;
  email: string;
  password: string;
  username: string;
};

@injectable()
export class UserSignuper {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params) {
    await this.ensureThatUserWithTheSameEmailNotExists(
      new UserEmail(params.email)
    );
    await this.ensureThatUserWithTheSameUsernameNotExists(
      new UserUsername(params.username)
    );

    const user = User.create({
      id: new UserId(params.id || Uuid.random().value),
      email: new UserEmail(params.email),
      password: new UserPassword(params.password),
      username: new UserUsername(params.username),
      copyright_name: null,
      copyright_url: null,
      banner_url: null,
      profile_url: null,
      description: null,
      name: null,
      surname: null,
      allow_users_message_me: false,
      marketing_off_site: false,
      send_special_offers: false,
      show_age_in_profile: false,
      show_city_and_country_in_profile: false,
      visible_real_name: false,
    });

    await this.repository.save(user);
  }

  private async ensureThatUserWithTheSameEmailNotExists(email: UserEmail) {
    const user = await this.repository.searchByEmail(email);

    if (user)
      throw new DuplicatedEntityException(
        `The email ${email} is taken, please use another.`
      );
  }

  private async ensureThatUserWithTheSameUsernameNotExists(
    username: UserUsername
  ) {
    const user = await this.repository.searchByUsername(username);

    if (user)
      throw new DuplicatedEntityException(
        `The username ${username} is taken, please use another.`
      );
  }
}
