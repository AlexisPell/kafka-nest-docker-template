import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BullModule } from '@nestjs/bull';
import { UsersConsumer } from './consumers/users.consumer';
import { QUEUES } from 'libs/constants/queues';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: QUEUES.USER_QUEUE,
    }),
  ],
  controllers: [],
  providers: [UsersService, UsersConsumer],
})
export class UsersModule {}
