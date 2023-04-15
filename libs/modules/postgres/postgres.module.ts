import { SequelizeModule } from '@nestjs/sequelize';
import { DynamicModule, Module } from '@nestjs/common';
import { ModelCtor } from 'sequelize-typescript';

interface PostgresModuleOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  autoLoadModels: boolean;
  synchronize: boolean;
  models: string[] | ModelCtor[];
}

@Module({})
export class PostgresModule {
  static register({
    host,
    port,
    username,
    password,
    database,
    autoLoadModels,
    models,
  }: PostgresModuleOptions): DynamicModule {
    return {
      module: PostgresModule,
      imports: [
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadModels,
          models,
        }),
      ],
      exports: [SequelizeModule],
      global: true,
    };
  }
}
