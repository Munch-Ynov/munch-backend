// biome-ignore lint/style/useImportType: <explanation>
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => {
          if (data === null) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
          }
          if (data === undefined) {
            return { statusCode: HttpStatus.NO_CONTENT };
          }
          return { statusCode: HttpStatus.OK, data };
        }),
        catchError(err => {
          if (err instanceof ParameterException) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
          }
          if (err instanceof HttpException) {
            throw err;
          }
          throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }
}
