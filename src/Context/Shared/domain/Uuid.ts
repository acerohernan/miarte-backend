import { v4 as uuid, validate } from "uuid";
import { InvalidArgumentException } from "./exception/InvalidArgumentException";
import { StringValueObject } from "./StringValueObject";

export class Uuid extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value);

    this.ensureThatIsValidUuid(value);
    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureThatIsValidUuid(value: string) {
    if (!validate(value))
      throw new InvalidArgumentException(
        `The value ${value} is not assignable to ${this.constructor.name}`
      );
  }
}
