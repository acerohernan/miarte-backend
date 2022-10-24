import "reflect-metadata";
import { UserSignuper } from "../../../../src/Context/User/application/user-signup/UserSignuper";
import { UserMother } from "../../domain/UserMother";
import { UserReposiotryMock } from "../__mocks__/UserReposiotryMock";

describe("UserSignuper", () => {
  it("should create a new user", async () => {
    const user = UserMother.random();
    const repository = new UserReposiotryMock();
    const applicationService = new UserSignuper(repository);

    await applicationService.run({
      email: user.email.value,
      password: "Password1",
      username: user.username.value,
    });

    repository.assertSaveHasBeenCalledWith(user);
  });
});
