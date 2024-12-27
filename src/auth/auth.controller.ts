import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @ApiBody({ type: SignUpDto })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signIn')
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
