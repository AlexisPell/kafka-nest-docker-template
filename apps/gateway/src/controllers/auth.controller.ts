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
import { SignInDto } from 'libs/modules/auth/dto/sign-in.dto';
import { SignUpDto } from 'libs/modules/auth/dto/sign-up.dto';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';

@Injectable()
@Controller()
export class AuthController implements OnModuleInit {
  logger: Logger = new Logger(AuthController.name);

  @Client({
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
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA.TOPICS.AUTH.SIGN_UP);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.AUTH.SIGN_IN);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.AUTH.REFRESH_TOKEN);
    this.client.subscribeToResponseOf(KAFKA.TOPICS.AUTH.LOGOUT);
    await this.client.connect();
  }

  @Post('local/signup')
  async signUpLocal(@Body() signUpDto: SignUpDto): Promise<any> {
    this.logger.debug('local signup endpoint');
    return this.client.send(
      KAFKA.TOPICS.AUTH.SIGN_UP,
      instanceToPlain(signUpDto),
    );
  }

  @Post('local/signin')
  async signInLocal(@Body() signInDto: SignInDto): Promise<any> {
    this.logger.debug('local signin endpoint');
    return this.client.send(
      KAFKA.TOPICS.AUTH.SIGN_IN,
      instanceToPlain(signInDto),
    );
  }

  @Post('refresh')
  async refreshToken(): Promise<any> {
    this.logger.debug('refresh token endpoint');
    return this.client.send(KAFKA.TOPICS.AUTH.REFRESH_TOKEN, '');
  }

  @Post('logout')
  async logout(): Promise<any> {
    this.logger.debug('logout endpoint');
    return this.client.send(KAFKA.TOPICS.AUTH.LOGOUT, '');
  }
}
