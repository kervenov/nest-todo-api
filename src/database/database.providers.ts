import { Sequelize } from 'sequelize-typescript';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';

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
        logging: false,
      });
      sequelize.addModels([Todo, User]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
