import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exception/NotFoundException";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/value-object/UserEmail";

type Params = {
  email: string;
};

@injectable()
export class UserForgotPasswordHandler {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params): Promise<{ code: string }> {
    const user = await this.repository.searchByEmail(
      new UserEmail(params.email)
    );

    if (!user)
      throw new NotFoundException(
        `The user with the email ${params.email} not exists`
      );

    const code = this.createTheCodeToRestoreThePassword(user);
    return { code };
  }

  private createTheCodeToRestoreThePassword(user: User): string {
    const payload = {
      restore_password: true,
      user: user.id.value,
    };

    return jwt.sign(payload, "secret", { algorithm: "HS256" });
  }
}
