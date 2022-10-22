import { Uuid } from "./Uuid";

export type AggregateRootPrimitives = {
  id: string;
};

export abstract class AgregateRoot {
  abstract readonly id: Uuid;
  abstract toPrimitives(): any;
}
