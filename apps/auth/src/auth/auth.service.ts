import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Client, ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { hash } from 'bcrypt';

import { CLIENT_OPTIONS } from 'libs/common/kafka/client-options';
import { SignInDto } from 'libs/modules/auth/dto/sign-in.dto';
import { SignUpDto } from 'libs/modules/auth/dto/sign-up.dto';
import { KAFKA } from 'libs/common/kafka/kafka.constants';
import { UserAttributes } from 'libs/modules/users/models/user.model';

@Injectable()
export class AuthService {
  logger: Logger = new Logger(AuthService.name);

  @Client(CLIENT_OPTIONS.USERS_CLIENT_OPTIONS('auth-service'))
  usersClient: ClientKafka;

  async onModuleInit() {
    this.usersClient.subscribeToResponseOf(
      KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL,
    );
    this.usersClient.subscribeToResponseOf(KAFKA.TOPICS.USERS.CREATE_USER);
    await this.usersClient.connect();
  }

  async signUpLocal(signUpDto: SignUpDto) {
    this.logger.debug('Service: signUpLocal');
    try {
      const hashedPassword = await this.hashData(signUpDto.password);
      console.log('Hashed password: ' + hashedPassword);
      const user = await firstValueFrom(
        this.usersClient
          .send<UserAttributes>(
            KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL,
            signUpDto.email,
          )
          .pipe(
            catchError((err) => {
              console.log('ERROR IN AUTH: ', err);
              return throwError(
                () =>
                  new RpcException(
                    new BadRequestException(err.response.message),
                  ),
              );
            }),
          ),
      );
      console.log('GET USER BY EMAIL TOPIC', user);
      return { msg: 'Privet)', user };
    } catch (err) {
      const error = err.response?.message || err.message;
      throw new RpcException(new BadRequestException(error));
    }
  }

  signInLocal(signInDto: SignInDto) {
    //
  }

  refreshToken() {
    //
  }

  logout() {
    //
  }

  private async hashData(data: string) {
    return await hash(data, 10);
  }
}
