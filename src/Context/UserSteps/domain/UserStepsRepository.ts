import { Nullable } from "../../Shared/domain/Nullable";
import { UserId } from "../../User/domain/value-object/UserId";
import { UserSteps } from "./UserSteps";

export interface UserStepsRepository {
  save(steps: UserSteps): Promise<void>;
  searchByUserId(userId: UserId): Promise<Nullable<UserSteps>>;
}
