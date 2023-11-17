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
      throw new HttpException(
        'The requested resource(s) could not be found.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async createTask(createTodoDto: CreateTodoDto, request) {
    if (!createTodoDto.task) {
      throw new HttpException(
        'The requested content format is not supported. Please try a different format.',
        HttpStatus.NOT_ACCEPTABLE,
      );
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
          throw new HttpException(
            'The request could not be completed due to a conflict with the current state of the target resource.',
            HttpStatus.CONFLICT,
          );
        });
      return newTask;
    } catch (error) {
      throw new HttpException(
        `An unexpected error occurred on the server: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async modify(body: CreateTodoDto, id: string) {
    if (!body || !id) {
      throw new HttpException('Fill all fields!', HttpStatus.NOT_ACCEPTABLE);
    } else {
      const task = await this.todoRepository.findOne({
        where: { taskId: id },
      });
      if (task) {
        task.task = body.task;
        task.save();
        return task;
      } else {
        throw new HttpException('Task could not found!', HttpStatus.NOT_FOUND);
      }
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
  async findOne(id: string) {
    const task = await this.todoRepository.findOne({ where: { taskId: id } });
    if (task) {
      return task;
    } else {
      throw new HttpException('Task could not be found', HttpStatus.NOT_FOUND);
    }
  }
  async remove(id) {
    const task = await this.todoRepository.findOne({
      where: { taskId: id },
    });
    if (task) {
      task.destroy();
      task.save();
    }
    return { message: 'Deleted succesfully' };
  }
}
