import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './app.config';
import { PinoLogger } from './logger/pino.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.useLogger(new PinoLogger());
    const appConfigService = app.get(AppConfigService);
    await app.listen(appConfigService.port);
}

bootstrap();
