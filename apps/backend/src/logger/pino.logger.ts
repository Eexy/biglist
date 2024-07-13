import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import pino, { Logger } from 'pino';
import { LoggerConfigService } from './logger.config';
import * as process from 'node:process';
import { join } from 'node:path';
import { LogWriter } from 'drizzle-orm/logger';

@Injectable({ scope: Scope.TRANSIENT })
export class PinoLogger extends ConsoleLogger implements LogWriter {
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

    log(message: any) {
        this.logger.info(
            `${this.context ? `[${this.context}]: ` : ''}${message}`,
        );
    }

    fatal(message: any) {
        this.logger.fatal(
            `${this.context ? `[${this.context}]: ` : ''}${message}`,
        );
    }

    error(message: any) {
        this.logger.error(
            `${this.context ? `[${this.context}]: ` : ''}${message}`,
        );
    }

    warn(message: any) {
        this.logger.warn(
            `${this.context ? `[${this.context}]: ` : ''}${message}`,
        );
    }

    write(message: any) {
        this.logger.info(
            `${this.context ? `[${this.context}]: ` : ''}${message}`,
        );
    }
}
