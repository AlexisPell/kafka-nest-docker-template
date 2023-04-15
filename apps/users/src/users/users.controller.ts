import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { IKafkaMessage } from 'libs/common/interfaces/kafka';

import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import { KAFKA } from 'libs/common/constants/kafka';
import { ConfigService } from 'libs/modules/config/config.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern(KAFKA.TOPICS.USERS.GET_USERS)
  getUsers(@Payload() message: IKafkaMessage<string>) {
    console.log('CONSUMER GET USERS: ', message);
    console.log('CONFIG:', JSON.stringify(this.configService.getConfig()));

    return this.usersService.getUsers();
  }

  @MessagePattern(KAFKA.TOPICS.USERS.CREATE_USER)
  createUser(@Payload() message: CreateUserDto) {
    console.log('CONSUMER CREATE USER: ', message);
    return this.usersService.createUser(message);
  }
}
