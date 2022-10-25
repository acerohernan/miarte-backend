import { injectable } from "inversify";
import { DataSource } from "typeorm";
import { TypeOrmClientFactory } from "../../../../../src/Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { EnvironmentArranger } from "../arranger/EnvironmentArranger";

@injectable()
export class TypeOrmEnvironmentArranger implements EnvironmentArranger {
  async client(): Promise<DataSource> {
    return TypeOrmClientFactory.getConnection();
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase();
  }
  async close(): Promise<void> {
    return (await this.client()).destroy();
  }

  async cleanDatabase() {
    const client = await this.client();
    const entities = client.entityMetadatas;

    try {
      for (const entity of entities) {
        const repository = client.getRepository(entity.name);
        await repository.clear();
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error} `);
    }
  }
}
