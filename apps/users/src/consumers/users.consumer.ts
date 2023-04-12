import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUES } from 'libs/constants/queues';

@Processor(QUEUES.USER_QUEUE)
export class UsersConsumer {
  @Process()
  async defaultConsumer(job: Job<any>) {
    console.log('User service. Received job:', JSON.stringify(job));
    return { msg: 'Hello from user service' };
  }
}
