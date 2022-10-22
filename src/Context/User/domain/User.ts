import { AgregateRoot } from "../../Shared/domain/AggregateRoot";
import { UserEmail } from "./value-object/UserEmail";
import { UserId } from "./value-object/UserId";
import { UserPassword } from "./value-object/UserPassword";

export type UserPrimitives = {
  id: string;
  email: string;
  password: string;
};

export type UserProperties = {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
};

export class User extends AgregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly password: UserPassword;

  constructor(params: UserProperties) {
    super();
    this.id = params.id;
    this.email = params.email;
    this.password = params.password;
  }

  static fromPrimitives({ id, email, password }: UserPrimitives): User {
    return new User({
      id: new UserId(id),
      email: new UserEmail(email),
      password: new UserPassword(password),
    });
  }

  static create({ id, email, password }: UserProperties): User {
    const user = new User({
      id,
      email,
      password,
    });

    //CREATE THE "USER.CREATED" EVENT

    return user;
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
