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
import { KAFKA } from 'libs/common/kafka/kafka.constants';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import { UserAttributes } from 'libs/modules/users/models/user.model';
import { CLIENT_OPTIONS } from 'libs/common/kafka/client-options';

@Injectable()
@Controller('users')
export class UsersController implements OnModuleInit {
  logger: Logger = new Logger(UsersController.name);

  @Client(CLIENT_OPTIONS.USERS_CLIENT_OPTIONS('gateway-users-controller'))
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.USERS.CREATE_USER);
    await this.client.connect();
  }

  @Get()
  async getUserByEmail(@Query('email') email: string): Promise<UserAttributes> {
    this.logger.debug('GET / query email:', email);
    const user = await firstValueFrom(
      this.client
        .send<UserAttributes>(KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL, email)
        .pipe(
          catchError((err) => throwError(() => new RpcException(err.response))),
        ),
    );
    this.logger.debug('User received: ', user);
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    this.logger.debug('POST / createUserDto:', instanceToPlain(createUserDto));
    return this.client.send(
      KAFKA.TOPICS.USERS.CREATE_USER,
      instanceToPlain(createUserDto),
    );
  }
}
