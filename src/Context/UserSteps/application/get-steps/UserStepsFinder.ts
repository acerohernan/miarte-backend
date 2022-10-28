import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exception/NotFoundException";
import { UserId } from "../../../User/domain/value-object/UserId";
import { UserStepsRepository } from "../../domain/UserStepsRepository";

type Params = {
  user_id: string;
};

@injectable()
export class UserStepsFinder {
  constructor(
    @inject(CONTAINER_TYPES.UserStepsRepository)
    private repository: UserStepsRepository
  ) {}

  async run(params: Params): Promise<{ steps: any }> {
    const steps = await this.repository.searchByUserId(
      new UserId(params.user_id)
    );

    if (!steps)
      throw new NotFoundException(`The steps for the user not exists`);

    return { steps: steps.toPrimitives() };
  }
}
