import { MiArteApp } from "./MiArteApp";

try {
  new MiArteApp().start();
} catch (error) {
  console.log(error);
  process.exit(1);
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});
