import { FactoryProvider } from '@nestjs/common';
import { DrizzleConfigService } from './drizzle.config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { PinoLogger } from '../logger/pino.logger';
import { DefaultLogger } from 'drizzle-orm/logger';

export const drizzleConnectionProviders: FactoryProvider[] = [
    {
        provide: 'POSTGRES_CONNECTION',
        useFactory: async (
            drizzleConfigService: DrizzleConfigService,
            logger: PinoLogger,
        ) => {
            // for query purposes
            const queryClient = postgres(
                `postgres://${drizzleConfigService.user}:${drizzleConfigService.password}@${drizzleConfigService.host}:${drizzleConfigService.port}/${drizzleConfigService.name}`,
            );

            logger.setContext('Database');
            if (drizzleConfigService.dbLog) {
                return drizzle(queryClient, {
                    logger: new DefaultLogger({ writer: logger }),
                });
            }

            return drizzle(queryClient, {});
        },
        inject: [DrizzleConfigService, PinoLogger],
    },
];
