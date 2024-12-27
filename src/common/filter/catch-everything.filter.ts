// https://docs.nestjs.com/exception-filters
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

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const _request = ctx.getRequest();
    const _response = ctx.getResponse();

    let responseBody: ResponseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      error: exception.message,
    };

    if (exception instanceof HttpException) {
      const exceptionStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      responseBody = {
        ...responseBody,
        statusCode: exceptionStatus,
        message: (exceptionResponse['message'] || exceptionResponse).toString(),
      };
    }

    console.log('CatchEverythingFilter - request.headers: ', _request.headers);
    console.log('CatchEverythingFilter - request.body: ', _request.body);
    console.log('CatchEverythingFilter - responseBody: ', responseBody);

    httpAdapter.reply(_response, responseBody, responseBody.statusCode);
  }
}
