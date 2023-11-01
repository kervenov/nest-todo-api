import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Todo extends Model {
  @Column({ primaryKey: true })
  taskId: string;

  @Column({ unique: true })
  task: string;

  @Column({})
  isDone: boolean;

  @ForeignKey(() => User)
  @Column
  belongsTo: string;

  @BelongsTo(() => User)
  user: User;
}
