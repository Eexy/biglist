import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { PinoLogger } from '../../logger/pino.logger';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly logger: PinoLogger) {
        this.logger.setContext('LoggerInterceptor');
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req: Request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            tap(() =>
                this.logger.log({
                    url: req.url,
                    method: req.method,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    headers: req.headers,
                }),
            ),
        );
    }
}
