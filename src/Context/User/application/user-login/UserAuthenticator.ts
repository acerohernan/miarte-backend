import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { UnauthorizedException } from "../../../Shared/domain/exception/UnauthorizedException";
import config from "../../../Shared/infrastructure/config";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/value-object/UserEmail";

type Params = {
  email: string;
  password: string;
};

@injectable()
export class UserAuthenticator {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params): Promise<{ token: string }> {
    const user = await this.repository.searchByEmail(
      new UserEmail(params.email)
    );

    if (!user) throw new UnauthorizedException(`Invalid credentials`);

    this.ensureThanThePasswordIsCorrect(user, params.password);

    const token = this.createTheAccessToken(user);

    return { token };
  }

  private ensureThanThePasswordIsCorrect(user: User, cadidatePassword: string) {
    const valid = user.password.comparePassword(cadidatePassword);

    if (!valid) throw new UnauthorizedException(`Invalid credentials`);
  }

  private createTheAccessToken(user: User): string {
    const payload = {
      sub: user.id.value,
      email: user.email.value,
    };

    return jwt.sign(payload, config.jwt.secret, {
      algorithm: "HS256",
    });
  }
}
