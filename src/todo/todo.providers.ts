import { Todo } from './entities/todo.entity';

export const todoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useValue: Todo,
  },
];
