import { FactoryProvider } from '@nestjs/common';
import { DrizzleConfigService } from './drizzle.config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const drizzleConnectionProviders: FactoryProvider[] = [
    {
        provide: 'POSTGRES_CONNECTION',
        useFactory: async (drizzleConfigService: DrizzleConfigService) => {
            // for query purposes
            const queryClient = postgres(
                `postgres://${drizzleConfigService.user}:${drizzleConfigService.password}@${drizzleConfigService.host}:${drizzleConfigService.port}/${drizzleConfigService.name}`,
            );
            return drizzle(queryClient);
        },
        inject: [DrizzleConfigService],
    },
];
