import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Logger, UseFilters } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import { KAFKA } from 'libs/common/constants/kafka';
import { ExceptionFilter } from './rpc-exception.filter';

@Controller()
export class UsersController {
  logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL)
  @UseFilters(new ExceptionFilter())
  getUserByEmail(@Payload() message: string) {
    this.logger.debug('Consumer server: get user by email:', message);
    return this.usersService.getUserByEmail(message);
  }

  @MessagePattern(KAFKA.TOPICS.USERS.CREATE_USER)
  createUser(@Payload() message: CreateUserDto) {
    this.logger.debug('Consumer server: create user. dto:', message);
    // return this.usersService.createUser(message);
  }
}
