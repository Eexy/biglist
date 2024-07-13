import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import pino from 'pino';

@Injectable({ scope: Scope.TRANSIENT })
export class PinoLogger extends ConsoleLogger {
    private logger = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        },
    });

    log(message: any, context?: string) {
        this.logger.info(message, context);
    }

    fatal(message: any, context?: string) {
        this.logger.fatal(message, context);
    }

    error(message: any, stackOrContext?: string) {
        this.logger.error(message, stackOrContext);
    }

    warn(message: any, context?: string) {
        this.logger.warn(message, context);
    }
}
