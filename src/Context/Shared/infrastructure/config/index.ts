import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    `.env.${process.env.NODE_ENV}`
  ),
});

type Env = {
  port: string;
  url: string;
  env: string;
  jwt: { secret: string };
  typeorm: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  rabbitmq: {
    vhost: string;
    username: string;
    password: string;
    hostname: string;
    port: number;
    secure: boolean;
    exchangeName: string;
    moduleName: string;
  };
};

const config: Env = {
  port: String(process.env.PORT),
  url: String(process.env.URL),
  env: String(process.env.NODE_ENV),
  jwt: { secret: String(process.env.JWT_SECRET) },
  typeorm: {
    host: String(process.env.TYPEORM_HOST),
    port: Number(process.env.TYPEORM_PORT),
    username: String(process.env.TYPEORM_USERNAME),
    password: String(process.env.TYPEORM_PASSWORD),
    database: String(process.env.TYPEORM_DATABASE),
  },
  rabbitmq: {
    vhost: String(process.env.RABBITMQ_VHOST),
    username: String(process.env.RABBITMQ_USERNAME),
    password: String(process.env.RABBITMQ_PASSWORD),
    hostname: String(process.env.RABBITMQ_HOSTNAME),
    port: Number(process.env.RABBITMQ_PORT),
    secure: Boolean(process.env.RABBITMQ_SECURE === "true" ? true : false),
    exchangeName: String(process.env.RABBITMQ_EXCHANGE_NAME),
    moduleName: String(process.env.RABBITMQ_MODULE_NAME),
  },
};

export default config;
