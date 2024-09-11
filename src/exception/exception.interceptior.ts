import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ParameterException } from './parameter-exception'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {


        return next.handle().pipe(
            map((data) => {


                if (data === null) {
                    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
                }
                if (data === undefined) {
                    context.switchToHttp().getResponse().status(HttpStatus.NO_CONTENT)
                }
                return data
            }),
            catchError((err, caught) => {

                // log the error
                Logger.error(`${err.message} ${err.stack}`)

                if (err instanceof ParameterException) {
                    throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
                }
                if (err instanceof HttpException) {
                    throw err
                }
                throw new HttpException(
                    'Internal Server Error',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        )
    }
}
