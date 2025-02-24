import type { HttpStatus } from '@nestjs/common';
import type { User } from './users/entities/user.entity';

declare global {
  type ModeType = 'PRODUCTION' | 'TESTING' | 'DEVELOPMENT';

  /**
   * User account information, all of these fields are unique and can be used to identify a user.
   */
  type UserAccount = Pick<User, 'userName' | 'email' | 'phone'>;

  interface JwtPayload extends UserAccount {
    sub: User['id'];
  }

  interface JwtUser extends UserAccount {
    id: User['id'];
  }

  interface ResponseBody<T = any> {
    statusCode: HttpStatus;
    message: string;
    timestamp: string;
    data?: T;
    error?: string;
  }
}
