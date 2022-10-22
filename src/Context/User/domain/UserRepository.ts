import { Nullable } from "../../Shared/domain/Nullable";
import { User } from "./User";
import { UserEmail } from "./value-object/UserEmail";
import { UserUsername } from "./value-object/UserUsername";

export interface UserRepository {
  save(user: User): Promise<void>;
  searchByEmail(email: UserEmail): Promise<Nullable<User>>;
  searchByUsername(username: UserUsername): Promise<Nullable<User>>;
}
