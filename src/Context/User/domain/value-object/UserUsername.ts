import { InvalidArgumentException } from "../../../Shared/domain/exception/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/domain/StringValueObject";

export class UserUsername extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.ensureThatIsAValidUsername(value);
  }

  private ensureThatIsAValidUsername(username: string) {
    if (!username)
      throw new InvalidArgumentException(
        `The ${this.constructor.name} needs to have a valid value`
      );

    if (username.length < 6)
      throw new InvalidArgumentException(
        `The username must have 6 characters at least`
      );
  }
}
