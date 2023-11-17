import {
  Body,
  Controller,
  Param,
  Patch,
  Put,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChangePasswordDto } from './dto/change-password-dto';
import { ApiCustomResponse } from 'src/decorator/ApiCustomResponse';
@ApiSecurity('token')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'string' },
      },
    },
  })
  @ApiCustomResponse([200, 401, 406, 498, 500])
  @Patch('changePassword')
  @Version('1')
  changePassword(@Req() req: Request, @Body() body: ChangePasswordDto) {
    return this.usersService.changePassword(req, body);
  }
  @UseGuards(AuthGuard)
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'string' },
      },
    },
  })
  @ApiCustomResponse([201, 401, 498, 500])
  @Put('deleteAccount/:password')
  @Version('1')
  deleteAccount(@Req() req: Response, @Param('password') password: string) {
    return this.usersService.deleteAccount(req, password);
  }
}
