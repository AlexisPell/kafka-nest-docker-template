import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA } from 'libs/common/kafka/kafka.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_CLIENT_BROKER],
          clientId: KAFKA.CLIENT_IDS.AUTH,
        },
        consumer: {
          groupId: KAFKA.CONSUMERS.AUTH,
        },
      },
    },
  );

  app.listen();
}
bootstrap();
