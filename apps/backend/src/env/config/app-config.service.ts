import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const appConfigSchema = z.object({
    PORT: z.coerce.number().nonnegative().default(3000),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
});

@Injectable()
export class AppConfigService {
    constructor(
        private readonly configService: ConfigService<
            z.infer<typeof appConfigSchema>,
            true
        >,
    ) {}

    get port() {
        return this.configService.get('PORT', { infer: true });
    }

    get nodeEnv() {
        return this.configService.get('NODE_ENV', { infer: true });
    }
}
