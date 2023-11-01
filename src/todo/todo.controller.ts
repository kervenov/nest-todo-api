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
@ApiSecurity('token')
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  createTask(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todoService.createTask(createTodoDto, req);
  }
  @UseGuards(AuthGuard)
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
