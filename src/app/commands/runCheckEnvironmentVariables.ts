import dotenv from "dotenv";
import config from "../../Context/Shared/infrastructure/config";
dotenv.config();

function run() {
  console.log(process.env.TYPEORM_HOST);
  console.log(process.env.TYPEORM_DATABASE);
  console.log(process.env.NODE_ENV);
  console.log(config);
}

run();
