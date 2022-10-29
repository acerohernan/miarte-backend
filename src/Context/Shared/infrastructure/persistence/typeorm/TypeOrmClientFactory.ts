import { DataSource } from "typeorm";
import config from "../../config";

export class TypeOrmClientFactory {
  static connection?: DataSource;

  static async createClient(): Promise<void> {
    if (this.connection !== undefined) return;

    try {
      const {
        env,
        typeorm: { username, password, database, host, port },
      } = config;

      console.log(
        config,
        process.env.TYPEORM_DATABASE,
        process.env.TYPEORM_USERNAME
      );

      const dataSource = new DataSource({
        type: "postgres",
        username,
        password,
        database,
        host,
        port,
        entities: [
          __dirname +
            "/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}",
        ],
        synchronize: env === "development" /* Disable for production */,
      });

      const connection = await dataSource.initialize();

      this.connection = connection;
    } catch (error) {
      console.log(error);
      throw new Error(`Typeorm connection error`);
    }
  }

  static async getConnection(): Promise<DataSource> {
    if (!this.connection) throw new Error(`Typeorm connection error`);

    return this.connection;
  }
}
