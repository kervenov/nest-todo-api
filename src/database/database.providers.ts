import { Sequelize } from 'sequelize-typescript';
import { Todo } from 'src/todo/entities/todo.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'kakamyrat',
        password: 'admin',
        database: 'todos',
      });
      sequelize.addModels([Todo]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
