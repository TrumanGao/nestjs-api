// https://docs.nestjs.com/interceptors#response-mapping
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseBody<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBody<T>> {
    return next.handle().pipe(
      map((data) => {
        console.log('TransformInterceptor - data: ', data);
        return {
          statusCode: HttpStatus.OK,
          message: 'Request successful',
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
