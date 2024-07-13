import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './env/config/app-config.service';
import { PinoLogger } from './logger/pino.logger';
import { LoggerConfigService } from './env/config/logger-config.service';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    const loggerConfigService = app.get(LoggerConfigService);
    app.useLogger(new PinoLogger(loggerConfigService));
    const appConfigService = app.get(AppConfigService);
    if (appConfigService.nodeEnv !== 'production') {
        app.useGlobalInterceptors(
            new LoggerInterceptor(new PinoLogger(loggerConfigService)),
        );
    }
    await app.listen(appConfigService.port);
}

bootstrap();
