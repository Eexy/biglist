import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { AppConfigService } from './app.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AppConfigService],
})
export class AppModule {}
