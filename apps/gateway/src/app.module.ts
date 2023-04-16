import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}
