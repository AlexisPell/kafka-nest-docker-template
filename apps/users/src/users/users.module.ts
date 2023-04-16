import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostgresModule } from 'libs/modules/postgres/postgres.module';
import { UserModel } from 'libs/modules/users/models/user.model';
import { ConfigModule } from 'libs/modules/config/config.module';
import { ConfigService } from 'libs/modules/config/config.service';
import { SequelizeModule } from '@nestjs/sequelize';

const pgConfig = new ConfigService().config.POSTGRES;

@Module({
  imports: [
    PostgresModule.register({
      host: pgConfig.HOST,
      port: pgConfig.PORT,
      username: pgConfig.USER,
      password: pgConfig.PASSWORD,
      database: pgConfig.DB,
      autoLoadModels: true,
      synchronize: true,
      models: [UserModel],
    }),
    SequelizeModule.forFeature([UserModel]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
