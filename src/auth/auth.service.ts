import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { generateJwtToken } from 'src/common/util/tools';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, ...findOneByAccountDta } = signUpDto;

    if (!password) {
      throw new UnauthorizedException('password is required');
    }

    const user = await this.usersService.findOneByAccount(findOneByAccountDta);
    if (user) {
      throw new UnauthorizedException('user already exists');
    }

    const createUserDto: CreateUserDto = {
      ...findOneByAccountDta,
      nickname: `用户${findOneByAccountDta.username}`,
      password: await hash(password, await genSalt()),
    };
    const newUser = await this.usersService.create(createUserDto);
    return await generateJwtToken(newUser, {
      configService: this.configService,
      jwtService: this.jwtService,
    });
  }

  async signIn(signInDto: SignInDto) {
    const { password, ...findOneByAccountDta } = signInDto;

    if (!password) {
      throw new UnauthorizedException('password is required');
    }

    const user = await this.usersService.findOneByAccount(findOneByAccountDta);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('wrong password');
    }

    return await generateJwtToken(user, {
      configService: this.configService,
      jwtService: this.jwtService,
    });
  }
}
