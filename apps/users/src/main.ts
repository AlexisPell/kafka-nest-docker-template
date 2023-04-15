import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { KAFKA } from 'libs/common/constants/kafka';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_CLIENT_BROKER],
          clientId: KAFKA.CLIENT_IDS.USERS,
        },
        consumer: {
          groupId: KAFKA.CONSUMERS.USERS,
        },
      },
    },
  );

  app.listen();
}
bootstrap();
