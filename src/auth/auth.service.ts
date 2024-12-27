import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  signUp(signUpDto: SignUpDto) {
    console.log(signUpDto);
    return 'This action adds a new user';
  }

  signIn(signInDto: SignInDto) {
    console.log(signInDto);
    return 'This action returns a user';
  }
}
