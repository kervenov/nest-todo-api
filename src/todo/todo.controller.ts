import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
@ApiSecurity('token')
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(AuthGuard)
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
    description: 'Not Created!',
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
  @Post('create')
  createTask(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todoService.createTask(createTodoDto, req);
  }
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'Ok',
    status: HttpStatus.OK,
    schema: {
      example: {
        response: 'Ok',
        status: HttpStatus.OK,
      },
    },
  })
  @ApiResponse({
    description: 'Can not fetch!',
    status: HttpStatus.NOT_FOUND,
    schema: {
      example: {
        response: 'Can not fetch!',
        status: HttpStatus.NOT_FOUND,
        message: 'Can not fetch!',
        name: 'HttpException',
      },
    },
  })
  @Get('findAll')
  findAll(@Req() req: Request) {
    return this.todoService.findAll(req);
  }
  @UseGuards(AuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string) {
    return this.todoService.update(id);
  }
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
