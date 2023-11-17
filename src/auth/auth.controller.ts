import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiCustomResponse } from 'src/decorator/ApiCustomResponse';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiCustomResponse([201, 406, 500])
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'string' },
      },
    },
  })
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
  @ApiCustomResponse([201, 406, 409, 500])
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'string' },
      },
    },
  })
  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }
}
