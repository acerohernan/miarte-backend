import { Uuid } from "./Uuid";

export abstract class AgregateRoot {
  abstract readonly id: Uuid;
  abstract toPrimitives(): any;
}
