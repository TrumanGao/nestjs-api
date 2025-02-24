import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { getJwtSecret } from 'src/common/util/tools';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  signUp(signUpDto: SignUpDto) {
    const users = this.usersService.findAll();
    console.log('/auth.service.ts - signUp:', signUpDto, users);
    return 'This action adds a new user';
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByAccount(signInDto);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const { userName, email, phone } = user;
    const payload: JwtPayload = {
      sub: user.id,
      userName,
      email,
      phone,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: getJwtSecret(this.configService),
    });
    return {
      access_token,
    };
  }
}
