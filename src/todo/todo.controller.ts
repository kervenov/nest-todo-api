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
  Version,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiCustomResponse } from 'src/decorator/ApiCustomResponse';
@ApiSecurity('token')
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(AuthGuard)
  @ApiCustomResponse([201, 406, 409, 498, 500])
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', example: 'string' },
        task: { type: 'string', example: 'string' },
        isDone: { type: 'string', example: 'boolean' },
        belongsTo: { type: 'string', example: 'string' },
      },
    },
  })
  @Post('create')
  @Version('1')
  createTask(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todoService.createTask(createTodoDto, req);
  }
  @UseGuards(AuthGuard)
  @ApiCustomResponse([200, 404, 498, 500])
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        task: { type: 'string', example: 'string' },
      },
    },
  })
  @Get('findAll')
  @Version('1')
  findAll(@Req() req: Request) {
    return this.todoService.findAll(req);
  }
  @UseGuards(AuthGuard)
  @ApiCustomResponse([200, 404, 498, 500])
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', example: 'string' },
        task: { type: 'string', example: 'string' },
        isDone: { type: 'string', example: 'boolean' },
        belongsTo: { type: 'string', example: 'string' },
      },
    },
  })
  @Get('findOne/:id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', example: 'string' },
        task: { type: 'string', example: 'string' },
        isDone: { type: 'string', example: 'boolean' },
        belongsTo: { type: 'string', example: 'string' },
      },
    },
  })
  @ApiCustomResponse([200, 498, 500])
  @Patch('update/:id')
  @Version('1')
  update(@Param('id') id: string) {
    return this.todoService.update(id);
  }
  @UseGuards(AuthGuard)
  @ApiCustomResponse([200, 498, 500])
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'string' },
      },
    },
  })
  @Delete('/delete/:id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
  @UseGuards(AuthGuard)
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', example: 'string' },
        task: { type: 'string', example: 'string' },
        isDone: { type: 'string', example: 'boolean' },
        belongsTo: { type: 'string', example: 'string' },
      },
    },
  })
  @ApiCustomResponse([201, 406, 500])
  @Put('modify/:id')
  @Version('1')
  modify(@Body() body: CreateTodoDto, @Param('id') id: string) {
    return this.todoService.modify(body, id);
  }
}
