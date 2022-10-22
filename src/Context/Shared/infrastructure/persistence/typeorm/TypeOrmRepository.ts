import { EntitySchema, Repository } from "typeorm";
import {
  AggregateRootPrimitives,
  AgregateRoot,
} from "../../../domain/AggregateRoot";
import { TypeOrmClientFactory } from "./TypeOrmClientFactory";

export abstract class TypeOrmRepository<
  T extends AgregateRoot,
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
