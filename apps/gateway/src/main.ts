import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { KAFKA } from 'libs/common/constants/kafka';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   logger: new Logger(),
  //   options: {
  //     client: {
  //       brokers: [process.env.KAFKA_CLIENT_BROKER],
  //       clientId: KAFKA.CLIENT_IDS.USERS,
  //     },
  //     consumer: {
  //       groupId: KAFKA.CONSUMERS.USERS,
  //     },
  //     subscribe: {
  //       fromBeginning: true,
  //     },
  //   },
  // });
  // app.startAllMicroservices();
  await app.listen(process.env.API_GATEWAY_PORT);
}
bootstrap();
