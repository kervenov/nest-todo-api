import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password-dto';
import { Todo } from 'src/todo/entities/todo.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo,
  ) {}
  async changePassword(req, body: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { uuid: req['id'] },
    });
    if (body.newPassword !== body.confirmPassword) {
      throw new HttpException(
        'Please confirm the same password!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (!body.confirmPassword || !body.newPassword || !body.oldPassword) {
      throw new HttpException(
        'Please fill all fields!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    console.log(user);
    if (user) {
      if (await bcrypt.compare(body.oldPassword, user.password)) {
        user.password = await bcrypt.hash(body.newPassword, 10);
        user.save();
        return { message: 'Password has changed succesfully' };
      } else {
        throw new HttpException(
          'Please use correct credientals!',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        'Requested user colud not be found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteAccount(req, password: string) {
    const user = await this.userRepository.findOne({
      where: { uuid: req['id'] },
    });
    if (await bcrypt.compare(password, user.password)) {
      await this.todoRepository.destroy({ where: { belongsTo: req['id'] } });
      await this.userRepository.destroy({ where: { uuid: req['id'] } });
      return { message: 'Deleted succesfully!' };
    } else {
      throw new HttpException('Incorrect password!', HttpStatus.BAD_REQUEST);
    }
  }
}
