import { AppException, APP_EXCEPTIONS } from "./AppException";

export class DuplicatedEntityException extends AppException {
  type: APP_EXCEPTIONS;

  constructor(message?: string) {
    super(message);
    this.type = APP_EXCEPTIONS.DUPLICATED_ENTITY;
  }
}
