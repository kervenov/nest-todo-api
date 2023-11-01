import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Todo } from 'src/todo/entities/todo.entity';

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column({})
  password: string;

  @HasMany(() => Todo)
  tasks: Todo[];
}
