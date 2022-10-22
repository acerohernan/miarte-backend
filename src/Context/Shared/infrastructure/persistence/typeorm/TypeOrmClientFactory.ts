import { DataSource } from "typeorm";

export class TypeOrmClientFactory {
  static connection?: DataSource;

  static async createClient(): Promise<void> {
    try {
      const connection = await new DataSource({
        username: "miarte",
        password: "password",
        type: "postgres",
        database: "miarte_local",
        host: "localhost",
        port: 5432,
        entities: [__dirname + "../../../../**/**/*.ts"],
        synchronize: true /* Disable for production */,
      });

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
