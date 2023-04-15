import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  users: any[] = [
    {
      email: 'test@example.com',
      password: '123456',
      id: 12353423,
    },
  ];

  createUser(userDto: CreateUserDto) {
    return { ...userDto, id: Math.random() * 10000 };
  }

  getUsers() {
    return this.users;
  }
}
