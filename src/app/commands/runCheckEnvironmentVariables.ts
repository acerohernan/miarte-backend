import dotenv from "dotenv";
dotenv.config();

function run() {
  console.log(process.env.TYPEORM_USERNAME);
  console.log(process.env.TYPEORM_PASSWORD);
  console.log(process.env.NODE_ENV);
}

run();
