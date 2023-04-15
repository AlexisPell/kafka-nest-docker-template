import {
  Body,
  Controller,
  Get,
  Injectable,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { KAFKA } from 'libs/common/constants/kafka';
import { ConfigService } from 'libs/modules/config/config.service';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';

@Injectable()
@Controller('users')
export class UsersController implements OnModuleInit {
  logger: Logger = new Logger(UsersController.name);

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
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA.TOPICS.USERS.GET_USERS);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.USERS.CREATE_USER);
    await this.client.connect();
  }

  @Get()
  async getUsers(): Promise<any> {
    this.logger.debug('Get users endpoint');
    return this.client.send(KAFKA.TOPICS.USERS.GET_USERS, '');
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    this.logger.debug('Create user endpoint', instanceToPlain(createUserDto));
    return this.client.send(
      KAFKA.TOPICS.USERS.CREATE_USER,
      instanceToPlain(createUserDto),
    );
  }
}
