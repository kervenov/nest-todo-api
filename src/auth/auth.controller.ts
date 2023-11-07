import { Body, Controller, Delete, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Delete('deleteAll')
  deleteAll() {
    return this.authService.deleteAll();
  }
  @ApiResponse({
    description: 'OK',
    status: HttpStatus.OK,
    schema: {
      example: {
        status: 'ok',
      },
    },
  })
  // @ApiResponse({
  //   description: 'Internal Server Error!',
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   schema: {
  //     example: {
  //       response: 'Internal Server Error',
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Internal Server Error',
  //       name: 'HttpException',
  //     },
  //   },
  // })
  @ApiResponse({
    description: 'Fill all fields!',
    status: HttpStatus.NOT_ACCEPTABLE,
    schema: {
      example: {
        response: 'Fill all fields!',
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Fill all fields!',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    description: 'Wrong password or username',
    status: HttpStatus.UNAUTHORIZED,
    schema: {
      example: {
        response: 'Wrong password or username!',
        status: HttpStatus.UNAUTHORIZED,
        message: 'Wrong password or username',
        name: 'HttpException',
      },
    },
  })
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @ApiResponse({
    description: 'Created',
    status: HttpStatus.CREATED,
    schema: {
      example: {
        response: 'Created',
        status: HttpStatus.CREATED,
      },
    },
  })
  @ApiResponse({
    description: 'Internal Server Error!',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    schema: {
      example: {
        response: 'Internal Server Error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    description: 'Fill all fields',
    status: HttpStatus.NOT_ACCEPTABLE,
    schema: {
      example: {
        response: 'Fill all fields',
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Fill all fields',
        name: 'HttpException',
      },
    },
  })
  @ApiResponse({
    description: 'Not Created',
    status: HttpStatus.CONFLICT,
    schema: {
      example: {
        response: 'Not Created',
        status: HttpStatus.CONFLICT,
        message: 'Not Created',
        name: 'HttpException',
      },
    },
  })
  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }
}
