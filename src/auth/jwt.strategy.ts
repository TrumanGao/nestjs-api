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
      secretOrKey: Buffer.from(
        configService.get<string>('JWT_SECRET'),
        'base64',
      ),
    });

    if (APP_MODE === 'DEVELOPMENT') {
      this.generateToken();
    }
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

  async generateToken() {
    const payload: JwtPayload = {
      sub: 0,
      userName: 'TEST',
      email: 'test@outlook.com',
      phone: '1234567890',
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: getJwtSecret(this.configService),
    });
    console.log('access_token:', access_token);
    return {
      access_token,
    };
  }
}
