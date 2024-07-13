import { Module } from '@nestjs/common';
import { drizzleConnectionProviders } from './drizzle-connection.providers';
import { DrizzleService } from './drizzle.service';

@Module({
    providers: [...drizzleConnectionProviders, DrizzleService],
    exports: [...drizzleConnectionProviders],
})
export class DrizzleModule {}
