import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const _request = ctx.getRequest();
    const _response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(_request),
    };

    console.log(
      'AllExceptionsFilter - 捕获全部异常-请求头：',
      _request.headers,
    );
    console.log('AllExceptionsFilter - 捕获全部异常-请求体：', _request.body);
    console.log('AllExceptionsFilter - 捕获全部异常-响应对象：', responseBody);

    httpAdapter.reply(_response, responseBody, httpStatus);
  }
}
