import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { InvalidArgumentException } from "../../../Shared/domain/exception/InvalidArgumentException";
import { UnauthorizedException } from "../../../Shared/domain/exception/UnauthorizedException";
import config from "../../../Shared/infrastructure/config";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/value-object/UserId";
import { UserPassword } from "../../domain/value-object/UserPassword";

type Params = {
  code: string;
  password: string;
  re_password: string;
};

@injectable()
export class UserPasswordRestorer {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private repository: UserRepository
  ) {}

  async run(params: Params) {
    const id = this.getTheUserIdFromForgotPasswordCode(params.code);

    const user = await this.repository.search(id);

    if (!user) throw new UnauthorizedException(`Unathorized`);

    this.verifyIfThePasswordConfirmationIsEqualThanThePassword(
      params.password,
      params.re_password
    );

    user.changePassword(new UserPassword(params.password));

    await this.repository.save(user);
  }

  private getTheUserIdFromForgotPasswordCode(code: string): UserId {
    try {
      const decoded = jwt.verify(code, config.jwt.secret);

      if (typeof decoded === "string") throw new Error();

      return new UserId(decoded["user"]);
    } catch (error) {
      throw new InvalidArgumentException(`The code ${code} is invalid`);
    }
  }

  private verifyIfThePasswordConfirmationIsEqualThanThePassword(
    password: string,
    passwordConfirmation: string
  ) {
    if (password !== passwordConfirmation)
      throw new InvalidArgumentException(`The password do not match`);
  }
}
