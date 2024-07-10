import { Module } from '@nestjs/common';
import { DrizzleConfigService } from './drizzle.config';
import { drizzleConnectionProviders } from './drizzle-connection.providers';
import { DrizzleService } from './drizzle.service';

@Module({
    providers: [
        ...drizzleConnectionProviders,
        DrizzleConfigService,
        DrizzleService,
    ],
    exports: [DrizzleConfigService, ...drizzleConnectionProviders],
})
export class DrizzleModule {}
