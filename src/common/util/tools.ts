import type { ConfigService } from '@nestjs/config';

export function getJwtSecret(
  configService: ConfigService,
  propertyPath: string = 'JWT_SECRET',
) {
  const secret = configService.get<string>(propertyPath);
  if (!secret) {
    throw new Error('JWT_SECRET is not defined.');
  }
  return Buffer.from(secret, 'base64');
}
