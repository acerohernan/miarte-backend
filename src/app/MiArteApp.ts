import "reflect-metadata";
import config from "../Context/Shared/infrastructure/config";
import { TypeOrmClientFactory } from "../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { Server } from "./server";

export class MiArteApp {
  server?: Server;

  async start() {
    const port = config.port || "5000";
    this.server = new Server(port);

    //configurations
    await TypeOrmClientFactory.createClient();

    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }
}
