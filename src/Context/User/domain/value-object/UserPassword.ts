import bcrypt from "bcrypt";
import { InvalidArgumentException } from "../../../Shared/domain/exception/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class UserPassword extends StringValueObject {
  static PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  //OVERRIDE
  value: string;

  constructor(value: string) {
    super(value);

    this.ensureThatIsAValidPassword(value);
    const hashedPassword = this.encryptThePassword(value);
    this.value = hashedPassword;
  }

  private ensureThatIsAValidPassword(password: string) {
    if (!UserPassword.PASSWORD_REGEX.test(password))
      throw new InvalidArgumentException(
        `The password must have more than 8 characters, at least one uppercase letter and one number`
      );
  }

  private encryptThePassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
