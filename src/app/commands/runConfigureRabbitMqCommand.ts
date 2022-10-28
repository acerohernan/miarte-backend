import { ConfigureRabbitMqCommand } from "./ConfigureRabbitMqCommand";

ConfigureRabbitMqCommand.run()
  .then(() => {
    console.log("RabbitMQ configured!");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
