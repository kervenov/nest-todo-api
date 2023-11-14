import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiCustomResponse } from 'src/decorator/ApiCustomResponse';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiCustomResponse([201, 406, 500])
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
  @ApiCustomResponse([201, 406, 409, 500])
  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }
}
