import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { userProviders } from './users/user.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'rootadmin',
    }),
    TodoModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UsersService, ...userProviders],
})
export class AppModule {}
