import { inject, injectable } from "inversify";
import { omit } from "lodash";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exception/NotFoundException";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/value-object/UserId";

type Params = {
  id: string;
};

@injectable()
export class UserGetter {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params): Promise<{ user: any }> {
    const user = await this.repository.search(new UserId(params.id));

    if (!user) throw new NotFoundException(`Not found the user information`);

    const privateFields = ["password"];

    return { user: omit(user.toPrimitives(), privateFields) };
  }
}
