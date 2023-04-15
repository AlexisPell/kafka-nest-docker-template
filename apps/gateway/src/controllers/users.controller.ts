import {
  Controller,
  Get,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { KAFKA } from 'libs/common/constants/kafka';

@Injectable()
@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_CLIENT_BROKER],
        clientId: KAFKA.CLIENT_IDS.USERS,
      },
      consumer: {
        groupId: KAFKA.CONSUMERS.USERS,
      },
      producerOnlyMode: true,
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA.TOPICS.users.getUsers);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.users.createUser);

    await this.client.connect();
  }

  @Get()
  async getUsers(): Promise<any> {
    console.log('Get users endpoint');
    // return 'hello';
    return this.client.send(KAFKA.TOPICS.users.getUsers, { msg: 'Tested' });
  }
}
