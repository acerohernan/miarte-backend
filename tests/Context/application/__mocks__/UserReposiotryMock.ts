import { Nullable } from "../../../../src/Context/Shared/domain/Nullable";
import { User } from "../../../../src/Context/User/domain/User";
import { UserRepository } from "../../../../src/Context/User/domain/UserRepository";
import { UserEmail } from "../../../../src/Context/User/domain/value-object/UserEmail";
import { UserUsername } from "../../../../src/Context/User/domain/value-object/UserUsername";

export class UserReposiotryMock implements UserRepository {
  private mocksSearchByEmail = jest.fn();
  private mocksSearchByUsername = jest.fn();
  private mockSave = jest.fn();

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }
  async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    this.mocksSearchByEmail(email);
    return null;
  }
  async searchByUsername(username: UserUsername): Promise<Nullable<User>> {
    this.mocksSearchByUsername(username);
    return null;
  }

  public assertSaveHasBeenCalledWith(user: User) {
    expect(this.mockSave).toHaveBeenCalledWith(user);
  }

  public assertSaveHasBeenCalled() {
    expect(this.mockSave).toHaveBeenCalled();
  }
}