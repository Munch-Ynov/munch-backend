import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(Error)
  export class UniformErrorFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
      const response: Response = host.switchToHttp().getResponse();
  
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        return response.status(status).json({
          status,
          message: exception.message,
          timestamp: new Date().toISOString(),
        });
      }
  
      return response.status(500).json({
        status: 500,
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
    }
  }