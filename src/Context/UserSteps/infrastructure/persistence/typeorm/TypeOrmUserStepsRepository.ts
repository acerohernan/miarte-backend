import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { UserId } from "../../../../User/domain/value-object/UserId";
import { UserSteps, UserStepsPrimitives } from "../../../domain/UserSteps";
import { UserStepsRepository } from "../../../domain/UserStepsRepository";
import { UserStepsEntity } from "./UserStepsEntity";

@injectable()
export class TypeOrmUserStepsRepository
  extends TypeOrmRepository<UserSteps, UserStepsPrimitives>
  implements UserStepsRepository
{
  entitySchema(): EntitySchema<UserStepsPrimitives> {
    return UserStepsEntity;
  }

  async save(steps: UserSteps): Promise<void> {
    return this.persist(steps);
  }
  async searchByUserId(userId: UserId): Promise<Nullable<UserSteps>> {
    const repository = await this.repository();
    const stepsPrimitives = await repository.findOneBy({
      user_id: userId.value,
    });

    if (!stepsPrimitives) return null;

    return UserSteps.fromPrimtives(stepsPrimitives);
  }
}
