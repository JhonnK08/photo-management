import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(dto.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await comparePassword(dto.password, user.password);
    if (isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const hashedPassword = await hashPassword(dto.password);

    return this.userService.create({
      ...dto,
      password: hashedPassword,
    });
  }
}
