import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { User, UserPrimitives } from "../../../domain/User";
import { UserRepository } from "../../../domain/UserRepository";
import { UserEmail } from "../../../domain/value-object/UserEmail";
import { UserUsername } from "../../../domain/value-object/UserUsername";
import { UserEntity } from "./UserEntity";

@injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User, UserPrimitives>
  implements UserRepository
{
  entitySchema(): EntitySchema<User> {
    return UserEntity;
  }
  async save(user: User): Promise<void> {
    await this.persist(user);
  }
  async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    const repository = await this.repository();
    const userPrimitives = await repository.findOneBy({ email: email.value });

    if (!userPrimitives) return null;

    return User.fromPrimitives(userPrimitives);
  }
  async searchByUsername(username: UserUsername): Promise<Nullable<User>> {
    const repository = await this.repository();
    const userPrimitives = await repository.findOneBy({
      username: username.value,
    });

    if (!userPrimitives) return null;

    return User.fromPrimitives(userPrimitives);
  }
}
