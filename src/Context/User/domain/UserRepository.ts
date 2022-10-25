import { Nullable } from "../../Shared/domain/Nullable";
import { User } from "./User";
import { UserEmail } from "./value-object/UserEmail";
import { UserId } from "./value-object/UserId";
import { UserUsername } from "./value-object/UserUsername";

export interface UserRepository {
  save(user: User): Promise<void>;
  searchByEmail(email: UserEmail): Promise<Nullable<User>>;
  searchByUsername(username: UserUsername): Promise<Nullable<User>>;
  search(id: UserId): Promise<Nullable<User>>;
}
