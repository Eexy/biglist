import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './app.config';
import { PinoLogger } from './logger/pino.logger';
import { LoggerConfigService } from './logger/logger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    const loggerConfigService = app.get(LoggerConfigService);
    app.useLogger(new PinoLogger(loggerConfigService));
    const appConfigService = app.get(AppConfigService);
    await app.listen(appConfigService.port);
}

bootstrap();
