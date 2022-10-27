import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Uuid } from "../../../Shared/domain/Uuid";
import { UserId } from "../../../User/domain/value-object/UserId";
import { UserSteps } from "../../domain/UserSteps";
import { UserStepsRepository } from "../../domain/UserStepsRepository";
import { UserStepsId } from "../../domain/value-object/UserStepsId";

type Params = {
  user_id: string;
  id?: string;
};

@injectable()
export class UserStepsCreator {
  constructor(
    @inject(CONTAINER_TYPES.UserStepsRepository)
    private repository: UserStepsRepository
  ) {}

  async run(params: Params): Promise<void> {
    const steps = UserSteps.create({
      id: new UserStepsId(params.id || Uuid.random().value),
      user_id: new UserId(params.user_id),
      avatar_added: false,
      banner_added: false,
      description_added: false,
      email_confirmed: false,
      name_and_address_added: false,
      payment_information_added: false,
      social_networks_added: false,
      updated_at: new Date(Date.now()),
    });

    await this.repository.save(steps);
  }
}
