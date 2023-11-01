import { Inject, Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo,
  ) {}

  async findAll(request): Promise<Todo[]> {
    const options = {
      where: { belongsTo: request.id },
      order: ['createdAt'],
    };

    return this.todoRepository.findAll(options);
  }
  async createTask(createTodoDto: CreateTodoDto, request) {
    const newTask = await this.todoRepository.create({
      taskId: `task-${uuidv4()}`,
      task: createTodoDto.task,
      isDone: false,
      belongsTo: request['id'],
    });
    return newTask;
  }
  async update(id) {
    const task = await this.todoRepository.findOne({
      where: { taskId: id },
    });
    task.isDone = !task.isDone;
    task.save();
    return task;
  }
  async remove(id) {
    const task = await this.todoRepository.findOne({
      where: { taskId: id },
    });
    if (task) {
      task.destroy();
      task.save();
    }
  }
}
