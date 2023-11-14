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
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
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
  @Post('create')
  createTask(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todoService.createTask(createTodoDto, req);
  }
  @UseGuards(AuthGuard)
  @ApiCustomResponse([200, 404, 498, 500])
  @Get('findAll')
  findAll(@Req() req: Request) {
    return this.todoService.findAll(req);
  }
  @UseGuards(AuthGuard)
  @ApiCustomResponse([200, 498, 500])
  @Patch('/:id')
  update(@Param('id') id: string) {
    return this.todoService.update(id);
  }
  @UseGuards(AuthGuard)
  @ApiCustomResponse([200, 498, 500])
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
