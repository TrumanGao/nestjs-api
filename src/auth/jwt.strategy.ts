import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT_APP') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        configService.get<string>('JWT_SECRET'),
        'base64',
      ),
    });
  }

  async validate(payload: JwtPayload) {
    const { userName, email, phone } = payload;
    const user: JwtUser = {
      id: payload.sub,
      userName,
      email,
      phone,
    };
    return user;
  }
}
