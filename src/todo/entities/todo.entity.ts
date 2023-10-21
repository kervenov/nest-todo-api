import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({ primaryKey: true })
  taskId: string;

  @Column({ unique: true })
  task: string;

  @Column({})
  isDone: boolean;
}
