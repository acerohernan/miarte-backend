import { AppException, APP_EXCEPTIONS } from "./AppException";

export class NotFoundException extends AppException {
  type: APP_EXCEPTIONS;

  constructor(message?: string) {
    super(message);
    this.type = APP_EXCEPTIONS.NOT_FOUND;
  }
}
