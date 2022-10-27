import amqplib, { ConsumeMessage } from "amqplib";

type RabbitMqPublicationParams = {
  exchange: string;
  routingKey: string;
  content: Buffer;
  options: {
    messageId: string;
    contentType: string;
    contentEncoding: string;
    priority?: number;
    headers?: any;
  };
};

export class RabbitMqConnection {
  private connection?: amqplib.Connection;
  private channel?: amqplib.ConfirmChannel;

  async connect() {
    this.connection = await this.createConnection();
    this.channel = await this.createChannel();
  }

  private async createConnection(): Promise<amqplib.Connection> {
    const connection = await amqplib.connect({
      vhost: "/",
      username: "guest",
      password: "guest",
      protocol: "amqp",
      hostname: "localhost",
      port: 5672,
    });

    connection.on("error", (err: any) => {
      Promise.reject(err);
    });

    return connection;
  }

  private async createChannel(): Promise<amqplib.ConfirmChannel> {
    const channel = await this.connection!.createConfirmChannel();
    await channel?.prefetch(1);

    return channel;
  }

  async publish(params: RabbitMqPublicationParams): Promise<void> {
    const { routingKey, content, options, exchange } = params;

    return new Promise((resolve, reject) => {
      this.channel?.publish(
        exchange,
        routingKey,
        content,
        options,
        (error: any) => (error ? reject(error) : resolve())
      );
    });
  }

  async consume(
    queue: string,
    onMessage: (message: ConsumeMessage) => {}
  ): Promise<void> {
    await this.channel?.consume(queue, (message: ConsumeMessage | null) => {
      if (!message) return;

      onMessage(message);
    });
  }

  ack(message: ConsumeMessage) {
    this.channel?.ack(message);
  }

  async deadLetter(message: ConsumeMessage, queue: string, exchange: string) {
    const deadLetterExchange = `dead_letter-${exchange}`;
    const options = {
      messageId: message.properties.messageId,
      contentType: message.properties.contentType,
      contentEncoding: message.properties.contentEncoding,
      priority: message.properties.priority,
    };

    return await this.publish({
      exchange: deadLetterExchange,
      routingKey: queue,
      content: message.content,
      options,
    });
  }

  async close() {
    await this.channel?.close();
    return await this.connection?.close();
  }

  async exchange(exchangeName: string) {
    return this.channel?.assertExchange(exchangeName, "topic", {
      durable: true,
    });
  }

  async queue(params: {
    exchange: string;
    name: string;
    routingKeys: Array<string>;
    deadLetterExchange?: string;
    deadletterQueue?: string;
    messageTtl?: Number;
  }) {
    const durable = true;
    const exclusive = false;
    const autoDelete = false;
    const args = this.getQueueArguments(params);

    await this.channel?.assertQueue(params.name, {
      exclusive,
      durable,
      autoDelete,
      arguments: args,
    });

    for (const routingKey of params.routingKeys) {
      await this.channel?.bindQueue(params.name, params.exchange, routingKey);
    }
  }

  private getQueueArguments(params: {
    exchange: string;
    name: string;
    routingKeys: string[];
    deadLetterExchange?: string;
    deadLetterQueue?: string;
    messageTtl?: Number;
  }) {
    let args: any = {};
    if (params.deadLetterExchange) {
      args = { ...args, "x-dead-letter-exchange": params.deadLetterExchange };
    }
    if (params.deadLetterQueue) {
      args = { ...args, "x-dead-letter-routing-key": params.deadLetterQueue };
    }
    if (params.messageTtl) {
      args = { ...args, "x-message-ttl": params.messageTtl };
    }

    return args;
  }
}
