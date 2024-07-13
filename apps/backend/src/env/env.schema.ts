import { z } from 'zod';
import { appConfigSchema } from '../app.config';
import { drizzleConfigSchema } from '../drizzle/drizzle.config';
import { loggerConfigSchema } from '../logger/logger.config';

export const envSchema = z
    .object({})
    .merge(appConfigSchema)
    .merge(drizzleConfigSchema)
    .merge(loggerConfigSchema);
