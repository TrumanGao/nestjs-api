// https://docs.nestjs.com/recipes/passport
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { APP_MODE } from 'src/common/config';
import { getJwtSecret } from 'src/common/util/tools';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(configService),
    });

    if (APP_MODE === 'DEVELOPMENT') {
      this.createToken();
    }
  }

  async validate(payload: JwtPayload) {
    const { username, email, phone } = payload;
    const user: JwtUser = {
      id: payload.sub,
      username,
      email,
      phone,
    };
    console.log('/jwt.strategy.ts - validate - user:', user);
    return user;
  }

  async createToken() {
    const payload: JwtPayload = {
      sub: 0,
      username: 'TEST',
      email: 'test@outlook.com',
      phone: '1234567890',
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: getJwtSecret(this.configService),
    });
    console.log('/jwt.strategy.ts - token:', token);
    return token;
  }
}
