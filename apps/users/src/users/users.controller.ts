import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { IKafkaMessage } from 'libs/common/interfaces/kafka';

import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import { KAFKA } from 'libs/common/constants/kafka';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(KAFKA.TOPICS.users.getUsers)
  getUsers(@Payload() msg: IKafkaMessage<string>) {
    console.log('CONSUMED MESSAGE', msg);
    return this.usersService.getUsers();
  }

  // @MessagePattern()
  // createUser(@Payload() message: IKafkaMessage<CreateUserDto>) {
  //   return this.usersService.createUser(message.value);
  // }
}
