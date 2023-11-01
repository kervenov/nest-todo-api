import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
  @Post('register')
  createUser(@Body() body: CreateUserDto, @Req() req: Request) {
    return this.authService.createUser(body, req);
  }
}
