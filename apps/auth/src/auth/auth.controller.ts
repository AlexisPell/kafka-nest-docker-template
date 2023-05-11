import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA } from 'libs/common/kafka/kafka.constants';
import { SignUpDto } from 'libs/modules/auth/dto/sign-up.dto';
import { SignInDto } from 'libs/modules/auth/dto/sign-in.dto';

@Controller()
export class AuthController {
  logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern(KAFKA.TOPICS.AUTH.SIGN_UP)
  signUpLocal(@Payload() message: SignUpDto) {
    this.logger.debug('Controller: signUpLocal:', message);
    return this.authService.signUpLocal(message);
  }

  @MessagePattern(KAFKA.TOPICS.AUTH.SIGN_IN)
  signInLocal(@Payload() message: SignInDto) {
    this.logger.debug('Controller: signInLocal:', message);
    return this.authService.signInLocal(message);
  }

  @MessagePattern(KAFKA.TOPICS.AUTH.REFRESH_TOKEN)
  refreshToken(@Payload() message: void) {
    this.logger.debug('Controller: refreshToken:', message);
    return this.authService.refreshToken();
  }

  @MessagePattern(KAFKA.TOPICS.AUTH.LOGOUT)
  logout(@Payload() message: void) {
    this.logger.debug('Controller: logout:', message);
    return this.authService.logout();
  }
}
