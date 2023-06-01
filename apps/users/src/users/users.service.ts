import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'libs/modules/users/dto/create-user.dto';
import {
  UserAttributes,
  UserModel,
} from 'libs/modules/users/models/user.model';

@Injectable()
export class UsersService {
  logger: Logger = new Logger(UsersService.name);

  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async getUserByEmail(email: string): Promise<UserAttributes> {
    this.logger.debug('Service: getUserByEmail, email: ', email);
    try {
      const user = await this.userModel.findOne({
        where: { email },
      });
      if (!user) {
        throw new RpcException(new BadRequestException('User is not found'));
      }
      return user.dataValues;
    } catch (err) {
      const error = err.response?.message ?? err.message;
      throw new RpcException(new BadRequestException(error));
    }
  }

  async findUserByEmail(email: string): Promise<UserAttributes | null> {
    this.logger.debug('Service: findUserByEmail, email: ', email);
    try {
      const user = await this.userModel.findOne({
        where: { email },
      });
      return user.dataValues;
    } catch (error) {
      throw new RpcException(new BadRequestException('Querying user failed'));
    }
  }

  async createUser(userDto: CreateUserDto): Promise<UserAttributes> {
    this.logger.debug('Service: createUser');
    try {
      const userExists = await this.userModel.findOne({
        where: { email: userDto.email },
      });
      if (userExists) throw new BadRequestException('User already exists');

      const { dataValues: user } = await this.userModel.create(userDto);

      this.logger.debug('User created: ', user);
      return user;
    } catch (error) {
      this.logger.error('Service: createUser error: ', error);
      throw new RpcException(
        new BadRequestException('Creating user failed', error),
      );
    }
  }
}
