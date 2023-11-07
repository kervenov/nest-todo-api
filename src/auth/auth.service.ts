import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as uniqid from 'uniqid';
import { Todo } from 'src/todo/entities/todo.entity';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo,
    private jwtService: JwtService,
  ) {}
  async deleteAll() {
    await this.userRepository.destroy({ where: {} });
    await this.todoRepository.destroy({ where: {} });
    return 'Deleted succesfully!!!';
  }
  async login(body: LoginUserDto) {
    const { username, password } = body;

    try {
      if (!username || !password) {
        throw new HttpException('Fill all fields', HttpStatus.NOT_ACCEPTABLE);
      }

      const user = await this.userRepository.findOne({
        where: { username: username },
      });

      if (!user) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new HttpException(
          'Wrong password or username!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = this.generateToken(user);
      return { access_token: token };
    } catch (error) {
      if (error instanceof HttpException) {
        // Handle specific HttpException errors
        console.error(`HttpException: ${error.message}`);
        return error;
      } else {
        // Handle other types of errors
        console.error(`Unexpected error: ${error.message}`);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async createUser(body: CreateUserDto) {
    const { username, password } = body;
    if (!username || !password) {
      throw new HttpException('Fill all fields', HttpStatus.NOT_ACCEPTABLE);
    }
    try {
      const newUser = await this.userRepository
        .create({
          uuid: uniqid('user-'),
          username: username,
          password: await bcrypt.hash(password, 10),
        })
        .catch(() => {
          throw new HttpException('Not Created!', HttpStatus.CONFLICT);
        });
      const token = this.generateToken(newUser);
      return { access_token: token };
    } catch {
      throw new HttpException('Not Created!', HttpStatus.CONFLICT);
    }
  }
  private generateToken(user: User) {
    const payload = {
      id: user.uuid,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '20m' });

    return token;
  }
}
