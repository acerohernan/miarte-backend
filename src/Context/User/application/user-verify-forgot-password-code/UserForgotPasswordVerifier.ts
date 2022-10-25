import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { InvalidArgumentException } from "../../../Shared/domain/exception/InvalidArgumentException";
import config from "../../../Shared/infrastructure/config";

type Params = {
  code: string;
};

@injectable()
export class UserForgotPasswordVerifier {
  constructor() {}

  async run(params: Params): Promise<void> {
    this.verifyIfIsAValidCode(params.code);
  }

  private verifyIfIsAValidCode(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);

      if (typeof decoded !== "string" && !decoded["restore_password"])
        throw new Error();
    } catch (error) {
      throw new InvalidArgumentException(`The code ${token} is invalid`);
    }
  }
}
