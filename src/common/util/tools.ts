import type { ConfigService } from '@nestjs/config';
import type { JwtService } from '@nestjs/jwt';

export function generateJwtSecret(options: {
  configService: ConfigService;
  propertyPath?: string;
}) {
  const { configService, propertyPath = 'JWT_SECRET' } = options;
  const _secret = configService.get<string>(propertyPath);
  if (!_secret) {
    throw new Error('JWT_SECRET is not defined.');
  }
  return Buffer.from(_secret, 'base64');
}

export async function generateJwtToken(
  user: JwtUser,
  options: {
    configService: ConfigService;
    jwtService: JwtService;
    propertyPath?: string;
  },
) {
  const { id, username, email, phone } = user;
  const { configService, jwtService, propertyPath = 'JWT_SECRET' } = options;
  const payload: JwtPayload = {
    sub: id,
    username,
    email,
    phone,
  };
  const secret = generateJwtSecret({
    configService,
    propertyPath,
  });
  const token = await jwtService.signAsync(payload, {
    secret: secret,
  });
  return token;
}
