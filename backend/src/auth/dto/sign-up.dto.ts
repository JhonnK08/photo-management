import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  username: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
