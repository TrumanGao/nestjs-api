import type { ConfigService } from '@nestjs/config';

export function getJwtSecret(
  configService: ConfigService,
  strategyName: string = 'jwt',
) {
  return Buffer.from(configService.get<string>(strategyName) || '', 'base64');
}
