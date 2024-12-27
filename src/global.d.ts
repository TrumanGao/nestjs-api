import type { HttpStatus } from '@nestjs/common';

declare global {
  interface ResponseBody<T = any> {
    statusCode: HttpStatus;
    message: string;
    timestamp: string;
    data?: T;
    error?: string;
  }
}

export {};
