import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

// import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTask(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTask(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Patch('/:id')
  update(@Param('id') id: number) {
    return this.todoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
  @Delete()
  format() {
    return this.todoService.format();
  }
}
