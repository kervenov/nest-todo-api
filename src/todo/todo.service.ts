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

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
  async createTask(createTodoDto: CreateTodoDto) {
    const newTask = await this.todoRepository.create({
      taskId: `task-${uuidv4()}`,
      task: createTodoDto.task,
      isDone: false,
    });
    return newTask;
  }
  async update(requiredId: number) {
    const task = await this.todoRepository.findOne({
      where: { taskId: requiredId },
    });
    task.isDone = !task.isDone;
    task.save();
    return task;
  }
  async remove(id: number) {
    const task = await this.todoRepository.findOne({
      where: { taskId: id },
    });
    if (task) {
      task.destroy();
      task.save();
    }
  }
  async format() {
    await this.todoRepository.destroy({ where: {} });
    return 'formatted succesfully!';
  }
}
