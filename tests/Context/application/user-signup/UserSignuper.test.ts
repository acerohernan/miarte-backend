import "reflect-metadata";
import { APP_EXCEPTIONS } from "../../../../src/Context/Shared/domain/exception/AppException";
import { InvalidArgumentException } from "../../../../src/Context/Shared/domain/exception/InvalidArgumentException";
import { UserSignuper } from "../../../../src/Context/User/application/user-signup/UserSignuper";
import { UserMother } from "../../domain/UserMother";
import { UserReposiotryMock } from "../__mocks__/UserReposiotryMock";

describe("UserSignuper", () => {
  it("should create a new user", async () => {
    const user = UserMother.random();
    const repository = new UserReposiotryMock();
    const applicationService = new UserSignuper(repository);

    await applicationService.run({
      id: user.id.value,
      email: user.email.value,
      password: user.password.value,
      username: user.username.value,
    });

    repository.assertSaveHasBeenCalledWith(user);
  });

  it("should throw an exception with bad email", async () => {
    try {
      const repository = new UserReposiotryMock();
      const applicationService = new UserSignuper(repository);

      await applicationService.run({
        email: "asdsdas",
        password: "Password1",
        username: "username",
      });

      /* If the use case not throw an error */
      throw new Error(`The use case not throw an error`);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidArgumentException);
      expect(error.type).toBe(APP_EXCEPTIONS.INVALID_ARGUMENT);
    }
  });

  it("should throw an exception with bad password", async () => {
    try {
      const repository = new UserReposiotryMock();
      const applicationService = new UserSignuper(repository);

      await applicationService.run({
        email: "test@test.com",
        password: "dfssdf",
        username: "username",
      });

      /* If the use case not throw an error */
      throw new Error(`The use case not throw an error`);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidArgumentException);
      expect(error.type).toBe(APP_EXCEPTIONS.INVALID_ARGUMENT);
    }
  });

  it("should throw an exception with bad username", async () => {
    try {
      const repository = new UserReposiotryMock();
      const applicationService = new UserSignuper(repository);

      await applicationService.run({
        email: "test@test.com",
        password: "Password1",
        username: "u",
      });

      /* If the use case not throw an error */
      throw new Error(`The use case not throw an error`);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidArgumentException);
      expect(error.type).toBe(APP_EXCEPTIONS.INVALID_ARGUMENT);
    }
  });
});
