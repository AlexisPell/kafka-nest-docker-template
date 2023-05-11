import {
  Body,
  Controller,
  Get,
  Injectable,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { Client, ClientKafka, RpcException } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { CLIENT_OPTIONS } from 'libs/common/kafka/client-options';
import { KAFKA } from 'libs/common/kafka/kafka.constants';
import { SignInDto } from 'libs/modules/auth/dto/sign-in.dto';
import { SignUpDto } from 'libs/modules/auth/dto/sign-up.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
@Controller()
export class AuthController implements OnModuleInit {
  logger: Logger = new Logger(AuthController.name);

  @Client(CLIENT_OPTIONS.AUTH_CLIENT_OPTIONS('gateway-auth-controller'))
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
    this.logger.debug(
      'POST /local/signup. signUpDto:',
      instanceToPlain(signUpDto),
    );
    const response = await firstValueFrom(
      this.client
        .send(KAFKA.TOPICS.AUTH.SIGN_UP, instanceToPlain(signUpDto))
        .pipe(
          catchError((err) => {
            console.log('CONTROLLER ERROR:', err);
            return throwError(() => new RpcException(err.response));
          }),
        ),
    );
    return response;
  }

  @Post('local/signin')
  async signInLocal(@Body() signInDto: SignInDto): Promise<any> {
    this.logger.debug(
      'POST /local/signin. signInDto:',
      instanceToPlain(signInDto),
    );
    return this.client.send(
      KAFKA.TOPICS.AUTH.SIGN_IN,
      instanceToPlain(signInDto),
    );
  }

  @Post('refresh')
  async refreshToken(): Promise<any> {
    this.logger.debug('POST /refresh');
    return this.client.send(KAFKA.TOPICS.AUTH.REFRESH_TOKEN, '');
  }

  @Post('logout')
  async logout(): Promise<any> {
    this.logger.debug('POST /logout');
    return this.client.send(KAFKA.TOPICS.AUTH.LOGOUT, '');
  }
}
