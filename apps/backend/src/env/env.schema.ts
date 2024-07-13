import { z } from 'zod';
import { appConfigSchema } from './config/app-config.service';
import { drizzleConfigSchema } from './config/drizzle-config.service';
import { loggerConfigSchema } from './config/logger-config.service';

export const envSchema = z
    .object({})
    .merge(appConfigSchema)
    .merge(drizzleConfigSchema)
    .merge(loggerConfigSchema);
