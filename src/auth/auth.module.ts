import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { userProviders } from 'src/users/user.providers';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders],
})
export class AuthModule {}
