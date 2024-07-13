import { Global, Module } from '@nestjs/common';
import { PinoLogger } from './pino.logger';
import { LoggerConfigService } from './logger.config';

@Global()
@Module({
    providers: [PinoLogger, LoggerConfigService],
    exports: [PinoLogger, LoggerConfigService],
})
export class LoggerModule {}
