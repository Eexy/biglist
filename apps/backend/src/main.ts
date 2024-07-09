import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfigService = app.get(AppConfigService);
    await app.listen(appConfigService.port);
}

bootstrap();
