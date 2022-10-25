import "reflect-metadata";
import { APP_EXCEPTIONS } from "../../../../../src/Context/Shared/domain/exception/AppException";
import { UserAuthenticator } from "../../../../../src/Context/User/application/user-login/UserAuthenticator";
import { UserMother } from "../../domain/UserMother";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock";

describe("UserAuthenticator", () => {
  it("should authenticate a valid user", async () => {
    const user = UserMother.random();
    const repository = new UserRepositoryMock();
    const applicationService = new UserAuthenticator(repository);
    try {
      await applicationService.run({
        email: user.email.value,
        password: user.password.value,
      });
    } catch (error) {}

    repository.assertSearchByEmailHasBeenCalledWith(user.email);
  });

  it("should throw an exception if the user not exists", async () => {
    const user = UserMother.random();
    const repository = new UserRepositoryMock();
    const applicationService = new UserAuthenticator(repository);
    try {
      await applicationService.run({
        email: user.email.value,
        password: user.password.value,
      });
    } catch (error: any) {
      repository.assertSearchByEmailHasBeenCalledWith(user.email);

      expect(error.type).toBe(APP_EXCEPTIONS.UNAUTHORIZED);
    }
  });

  it("should throw an exception if the email is invalid", async () => {
    const repository = new UserRepositoryMock();
    const applicationService = new UserAuthenticator(repository);
    try {
      await applicationService.run({
        email: "SWDSDAS",
        password: "Password1",
      });
    } catch (error: any) {
      expect(error.type).toBe(APP_EXCEPTIONS.INVALID_ARGUMENT);
    }
  });
});
