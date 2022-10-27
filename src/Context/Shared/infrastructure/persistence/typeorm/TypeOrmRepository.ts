import { injectable } from "inversify";
import { EntitySchema, Repository } from "typeorm";
import {
  AggregateRoot,
  AggregateRootPrimitives,
} from "../../../domain/AggregateRoot";
import { TypeOrmClientFactory } from "./TypeOrmClientFactory";

@injectable()
export abstract class TypeOrmRepository<
  T extends AggregateRoot,
  S extends AggregateRootPrimitives
> {
  abstract entitySchema(): EntitySchema<S>;

  protected async repository(): Promise<Repository<S>> {
    const dataSource = await TypeOrmClientFactory.getConnection();
    return dataSource.getRepository(this.entitySchema());
  }

  protected async persist(entity: T) {
    const reposity = await this.repository();
    await reposity.save(entity.toPrimitives());
  }
}
