import dotenv from "dotenv";
import config from "../../Context/Shared/infrastructure/config";
dotenv.config();

function run() {
  console.log(process.env.TYPEORM_USERNAME);
  console.log(process.env.TYPEORM_PASSWORD);
  console.log(process.env.NODE_ENV);
  console.log(config);
}

run();
