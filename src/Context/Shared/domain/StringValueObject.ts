import { InvalidArgumentException } from "./exception/InvalidArgumentException";

export abstract class StringValueObject {
  readonly value: string;

  constructor(value: string) {
    this.value = value;

    this.ensureThaIsString(value);
  }

  private ensureThaIsString(value: string) {
    if (typeof value !== "string")
      throw new InvalidArgumentException(
        `The value ${value} is not asignable to ${this.constructor.name}`
      );
  }
}
