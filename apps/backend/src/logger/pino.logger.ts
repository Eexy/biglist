import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import pino, { Logger } from 'pino';
import { LoggerConfigService } from './logger.config';
import * as process from 'node:process';
import { join } from 'node:path';

@Injectable({ scope: Scope.TRANSIENT })
export class PinoLogger extends ConsoleLogger {
    private logger: Logger;

    constructor(private readonly loggerConfigService: LoggerConfigService) {
        super();
        const transport = pino.transport({
            targets: [
                {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                    },
                },
                ...(this.loggerConfigService.logToFile
                    ? [
                          {
                              target: 'pino/file',
                              options: {
                                  destination: join(process.cwd(), 'log.txt'),
                              },
                          },
                      ]
                    : []),
            ],
        });
        this.logger = pino(transport);
    }

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
