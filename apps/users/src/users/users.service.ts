import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import {
  UserAttributes,
  UserModel,
} from 'libs/modules/users/models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async getUserByEmail(email: string): Promise<UserAttributes> {
    try {
      const user = await this.userModel.findOne({
        where: { email },
      });
      if (!user)
        throw new RpcException(new BadRequestException('User is not found'));
      return user.dataValues;
    } catch (error) {
      throw new RpcException(new BadRequestException('Querying user failed'));
    }
  }

  async createUser(userDto: CreateUserDto): Promise<UserAttributes> {
    const userExists = await this.userModel.findOne({
      where: { email: userDto.email },
    });
    if (userExists) throw new BadRequestException('User already exists');

    const { dataValues: user } = await this.userModel.create(userDto);

    return user;
  }
}
