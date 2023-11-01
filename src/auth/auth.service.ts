import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as uniqid from 'uniqid';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginUserDto) {
    try {
      const { username, password } = body;
      const user = await this.userRepository.findOne({
        where: { username },
      });
      if (!user) {
        throw new Error('User not found');
      }
      if (await bcrypt.compare(password, user.password)) {
        // Generate a token
        const token = this.generateToken(user);

        // Return the token and the user object
        return { access_token: token };
      } else {
        throw new Error('Wrong password or username!');
      }
    } catch (error) {
      return Error(error.message);
    }
  }
  async createUser(body: CreateUserDto, request) {
    const { username, password } = body;
    try {
      const newUser = await this.userRepository.create({
        uuid: uniqid('user-'),
        username: username,
        belongsTo: request['id'],
        password: await bcrypt.hash(password, 10),
      });
      const token = this.generateToken(newUser);
      return { access_token: token };
    } catch (error) {
      return new Error('Could not create the user!');
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
