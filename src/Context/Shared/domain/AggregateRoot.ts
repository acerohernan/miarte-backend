export type AggregateRootPrimitives = {
  id: string;
};

export abstract class AggregateRoot {
  abstract toPrimitives(): any;
}
