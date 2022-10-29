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

console.log({
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
};

export default config;
