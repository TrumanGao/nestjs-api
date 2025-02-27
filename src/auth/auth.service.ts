import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { getJwtSecret } from 'src/common/util/tools';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, ...findOneByAccountDta } = signUpDto;
    const user = await this.usersService.findOneByAccount(findOneByAccountDta);
    if (user) {
      throw new UnauthorizedException('user already exists');
    }

    const createUserDto: CreateUserDto = {
      ...signUpDto,
      nickname: `用户${signUpDto.username}`,
      username: signUpDto.username,
      password: await hash(password, await genSalt()),
    };
    const newUser = await this.usersService.create(createUserDto);
    return await this.createToken(newUser);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByAccount(signInDto);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const isMatch = await compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('wrong password');
    }

    return await this.createToken(user);
  }

  async createToken(user: User) {
    const { username, email, phone } = user;
    const payload: JwtPayload = {
      sub: user.id,
      username,
      email,
      phone,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: getJwtSecret(this.configService),
    });
    return token;
  }
}
