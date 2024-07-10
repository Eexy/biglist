import { z } from 'zod';
import { appConfigSchema } from '../app.config';

export const envSchema = z.object({}).merge(appConfigSchema);
