import { AppException, APP_EXCEPTIONS } from "./AppException";

export class InvalidArgumentException extends AppException {
  type: APP_EXCEPTIONS;

  constructor(message: string | undefined) {
    super(message);
    this.type = APP_EXCEPTIONS.INVALID_ARGUMENT;
  }
}
