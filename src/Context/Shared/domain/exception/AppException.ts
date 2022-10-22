export const enum APP_EXCEPTIONS {
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
  NOT_FOUND = "NOT_FOUND",
}

export abstract class AppException extends Error {
  abstract type: APP_EXCEPTIONS;
}
