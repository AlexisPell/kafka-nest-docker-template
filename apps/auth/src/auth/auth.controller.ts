import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA } from 'libs/common/constants/kafka';
import { IKafkaMessage } from 'libs/common/interfaces/kafka';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(KAFKA.TOPICS.AUTH.SIGN_UP)
  signUpLocal(@Payload() message: IKafkaMessage<string>) {
    // return this.usersService.getUsers();
  }

  @MessagePattern(KAFKA.TOPICS.AUTH.SIGN_IN)
  signInLocal(@Payload() message: IKafkaMessage<string>) {
    // return this.usersService.getUsers();
  }

  @MessagePattern(KAFKA.TOPICS.AUTH.REFRESH_TOKEN)
  refreshToken(@Payload() message: IKafkaMessage<string>) {
    // return this.usersService.getUsers();
  }

  @MessagePattern(KAFKA.TOPICS.AUTH.LOGOUT)
  logout(@Payload() message: IKafkaMessage<string>) {
    // return this.usersService.getUsers();
  }
}
