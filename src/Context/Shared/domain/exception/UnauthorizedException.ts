import { AppException, APP_EXCEPTIONS } from "./AppException";

export class UnauthorizedException extends AppException {
  type: APP_EXCEPTIONS;

  constructor(message?: string) {
    super(message);
    this.type = APP_EXCEPTIONS.UNAUTHORIZED;
  }
}
