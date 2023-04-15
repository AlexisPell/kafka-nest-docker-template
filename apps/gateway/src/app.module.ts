import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { TestConsumer } from './test.consumer';
import { KafkaModule } from 'libs/modules/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
