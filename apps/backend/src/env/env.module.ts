import { Global, Module } from '@nestjs/common';
import { LoggerConfigService } from './config/logger-config.service';
import { DrizzleConfigService } from './config/drizzle-config.service';
import { AppConfigService } from './config/app-config.service';

@Global()
@Module({
    imports: [],
    providers: [LoggerConfigService, DrizzleConfigService, AppConfigService],
    exports: [LoggerConfigService, DrizzleConfigService, AppConfigService],
})
export class EnvModule {}
