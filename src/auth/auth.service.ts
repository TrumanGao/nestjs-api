import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  signUp(signUpDto: SignUpDto) {
    const users = this.usersService.findAll();
    console.log('signUp: ', signUpDto, users);
    return 'This action adds a new user';
  }

  signIn(signInDto: SignInDto) {
    const users = this.usersService.findAll();
    console.log('signIn: ', signInDto, users);
    return 'This action returns a user';
  }
}
