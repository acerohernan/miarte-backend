import "reflect-metadata";
import { APP_EXCEPTIONS } from "../../../../src/Context/Shared/domain/exception/AppException";
import { UserForgotPasswordHandler } from "../../../../src/Context/User/application/user-forgot-password/UserForgotPasswordHandler";
import { UserMother } from "../../domain/UserMother";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock";

describe("UserForgotPasswordHandler", () => {
  it("should search by email in the repository", async () => {
    const user = UserMother.random();
    const repository = new UserRepositoryMock();
    const applicationService = new UserForgotPasswordHandler(repository);

    try {
      await applicationService.run({ email: user.email.value });
    } catch (error) {}

    repository.assertSearchByEmailHasBeenCalledWith(user.email);
  });

  it("should throw an exception with an invalid email", async () => {
    const repository = new UserRepositoryMock();
    const applicationService = new UserForgotPasswordHandler(repository);

    try {
      await applicationService.run({ email: "sadasd" });
    } catch (error: any) {
      expect(error.type).toBe(APP_EXCEPTIONS.INVALID_ARGUMENT);
    }
  });
});
