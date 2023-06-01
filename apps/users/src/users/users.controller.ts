import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Logger, UseFilters } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import { KAFKA } from 'libs/common/kafka/kafka.constants';
import { ExceptionFilter } from './rpc-exception.filter';

@Controller()
export class UsersController {
  logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(KAFKA.TOPICS.USERS.GET_USER_BY_EMAIL)
  getUserByEmail(@Payload() message: string) {
    this.logger.debug('Controller: getUserByEmail', message);
    return this.usersService.getUserByEmail(message);
  }

  @MessagePattern(KAFKA.TOPICS.USERS.CREATE_USER)
  createUser(@Payload() message: CreateUserDto) {
    this.logger.debug('Controller: createUser', message);
    return this.usersService.createUser(message);
  }
}
