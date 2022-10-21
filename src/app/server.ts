import compress from "compression";
import errohandler from "errorhandler";
import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import http from "http";
import httpStatus from "http-status";
import { registerRoutes } from "./routes";

export class Server {
  private express: Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(urlencoded({ extended: true }));
    this.express.use(json());
    this.express.use(helmet());
    this.express.use(compress());

    const router = Router();
    router.use(errohandler());

    this.express.use(router);

    registerRoutes(router);

    router.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    );
  }

  getHttpServer() {
    return this.httpServer;
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `MiArte Backend App is running on http://localhost:${this.port}`
        );
        console.log("Press Ctrl + C to stop");
      });
      resolve();
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) return resolve();

      this.httpServer.close((error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }
}
