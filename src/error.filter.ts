import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorDoggienote } from './error-doggienote';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof ErrorDoggienote
        ? exception.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof ErrorDoggienote) {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        error: exception.error,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Internal Server Error',
        error: 'InternalError',
      });
    }
  }
}
