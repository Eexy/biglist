import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validate';
import { DrizzleModule } from './drizzle/drizzle.module';
import { LoggerModule } from './logger/logger.module';
import { EnvModule } from './env/env.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate,
        }),
        DrizzleModule,
        LoggerModule,
        EnvModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
