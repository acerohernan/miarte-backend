import bcrypt from "bcrypt";
import { InvalidArgumentException } from "../../../Shared/domain/exception/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class UserPassword extends StringValueObject {
  private PASSWORD_VALIDATION_REGEX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  private BCRYPT_HASH_REGEX = /^\$2[ayb]\$.{56}$/;

  //OVERRIDE
  value: string;

  constructor(value: string) {
    super(value);

    this.ensureThatIsAValidPassword(value);

    let passwordToSave = value;

    if (!this.verifyIfIsAPasswordHashed(value)) {
      passwordToSave = this.encryptThePassword(value);
    }

    this.value = passwordToSave;
  }

  private ensureThatIsAValidPassword(password: string) {
    if (!this.PASSWORD_VALIDATION_REGEX.test(password))
      throw new InvalidArgumentException(
        `The password must have more than 8 characters, at least one uppercase letter and one number`
      );
  }

  private encryptThePassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  private verifyIfIsAPasswordHashed(password: string): boolean {
    return this.BCRYPT_HASH_REGEX.test(password);
  }
}
