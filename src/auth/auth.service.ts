import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signUp(signUpDto: SignUpDto) {
    const users = this.usersService.findAll();
    console.log('signUp: ', signUpDto, users);
    return 'This action adds a new user';
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByAccount(signInDto);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
