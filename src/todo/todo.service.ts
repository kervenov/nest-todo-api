import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    try {
      const tasks = await this.todoRepository.findAll(options);
      return tasks;
    } catch {
      throw new HttpException('Can not fetch!', HttpStatus.NOT_FOUND);
    }
  }
  async createTask(createTodoDto: CreateTodoDto, request) {
    if (!createTodoDto.task) {
      throw new HttpException('Fill all fields', HttpStatus.NOT_ACCEPTABLE);
    }
    try {
      const newTask = await this.todoRepository
        .create({
          taskId: `task-${uuidv4()}`,
          task: createTodoDto.task,
          isDone: false,
          belongsTo: request['id'],
        })
        .catch(() => {
          throw new HttpException('Not Created!', HttpStatus.CONFLICT);
        });
      return newTask;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
