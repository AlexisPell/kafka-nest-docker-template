import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUES } from 'libs/constants/queues';

@Injectable()
@Controller('users')
export class UsersController {
  constructor(
    @InjectQueue(QUEUES.USER_QUEUE) private readonly usersQueue: Queue,
  ) {}

  @Get()
  async getUser() {
    console.log('Get user endpoint');
    const job = await this.usersQueue.add({
      msg: 'Msg from test-queue',
    });
    return { msg: 'User endpoint' };
  }
}