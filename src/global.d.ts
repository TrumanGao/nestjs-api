import type { HttpStatus } from '@nestjs/common';

declare global {
  type ModeType = 'PRODUCTION' | 'TESTING' | 'DEVELOPMENT';

  interface ResponseBody<T = any> {
    statusCode: HttpStatus;
    message: string;
    timestamp: string;
    data?: T;
    error?: string;
  }
}
