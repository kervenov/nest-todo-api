import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  // @IsUsername()
  username: string;
  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
