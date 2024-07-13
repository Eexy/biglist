import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import pino, { Logger } from 'pino';
import { LoggerConfigService } from '../env/config/logger-config.service';
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
                        singleLine: true,
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
        if (typeof message === 'string') {
            return this.logger.info(
                `${this.context ? `[${this.context}]: ` : ''}${message}`,
            );
        }
        this.logger.info(message, `[${this.context}]`);
    }

    fatal(message: any) {
        if (typeof message === 'string') {
            return this.logger.fatal(
                `${this.context ? `[${this.context}]: ` : ''}${message}`,
            );
        }
        this.logger.fatal(message, `[${this.context}]`);
    }

    error(message: any) {
        if (typeof message === 'string') {
            return this.logger.error(
                `${this.context ? `[${this.context}]: ` : ''}${message}`,
            );
        }
        this.logger.error(message, `[${this.context}]`);
    }

    warn(message: any) {
        if (typeof message === 'string') {
            return this.logger.warn(
                `${this.context ? `[${this.context}]: ` : ''}${message}`,
            );
        }
        this.logger.warn(message, `[${this.context}]`);
    }

    write(message: any) {
        if (typeof message === 'string') {
            return this.logger.info(
                `${this.context ? `[${this.context}]: ` : ''}${message}`,
            );
        }
        this.logger.info(message, `[${this.context}]`);
    }
}
