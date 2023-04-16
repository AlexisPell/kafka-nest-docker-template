import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Injectable,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import {
  Client,
  ClientKafka,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { KAFKA } from 'libs/common/constants/kafka';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import { UserAttributes } from 'libs/modules/users/models/user.model';

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
    this.client.subscribeToResponseOf(KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.USERS.CREATE_USER);
    await this.client.connect();
  }

  @Get()
  async getUserByEmail(@Query('email') email: string): Promise<UserAttributes> {
    this.logger.debug('Get user by email endpoint. email: ', email);
    const response = await this.client
      .send<UserAttributes>(KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL, email)
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response))),
      );
    return firstValueFrom(response);
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
