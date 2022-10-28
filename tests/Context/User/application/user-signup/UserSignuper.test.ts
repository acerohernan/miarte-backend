import "reflect-metadata";
import { APP_EXCEPTIONS } from "../../../../../src/Context/Shared/domain/exception/AppException";
import { InvalidArgumentException } from "../../../../../src/Context/Shared/domain/exception/InvalidArgumentException";
import { UserSignuper } from "../../../../../src/Context/User/application/user-signup/UserSignuper";
import { EventBusMock } from "../../../Shared/domain/EventBusMock";
import { UserMother } from "../../domain/UserMother";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock";

let repository: UserRepositoryMock;
let eventBus: EventBusMock;
let applicationService: UserSignuper;

beforeEach(() => {
  repository = new UserRepositoryMock();
  eventBus = new EventBusMock();
  applicationService = new UserSignuper(repository, eventBus);
});

describe("UserSignuper", () => {
  it("should create a new user", async () => {
    const user = UserMother.random();

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
