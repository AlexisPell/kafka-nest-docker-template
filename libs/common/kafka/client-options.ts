import { ClientOptions, Transport } from '@nestjs/microservices';

type IClient = (clientName: string) => ClientOptions;

interface IClientOptions {
  USERS_CLIENT_OPTIONS: IClient;
  AUTH_CLIENT_OPTIONS: IClient;
}
export const CLIENT_OPTIONS: IClientOptions = {
  USERS_CLIENT_OPTIONS: (clientName) => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_CLIENT_BROKER],
        clientId: `${clientName}-client`,
      },
      consumer: {
        groupId: `${clientName}-consumer`,
      },
    },
  }),
  AUTH_CLIENT_OPTIONS: (clientName) => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_CLIENT_BROKER],
        clientId: `${clientName}-client`,
      },
      consumer: {
        groupId: `${clientName}-consumer`,
      },
    },
  }),
};
