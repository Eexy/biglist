import { z } from 'zod';
import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const drizzleConfigSchema = z.object({
    DB_PORT: z.coerce.number().default(5432),
    DB_HOST: z.string().default('localhost'),
    DB_NAME: z.string().default('postgres'),
    DB_USER: z.string().default('postgres'),
    DB_PASSWORD: z.string().default('postgres'),
    DB_TYPE: z.enum(['postgres']).default('postgres'),
});

@Global()
@Injectable()
export class DrizzleConfigService {
    constructor(
        private readonly configService: ConfigService<
            z.infer<typeof drizzleConfigSchema>,
            true
        >,
    ) {}

    get port() {
        return this.configService.get('DB_PORT', { infer: true });
    }

    get name() {
        return this.configService.get('DB_NAME', { infer: true });
    }

    get host() {
        return this.configService.get('DB_HOST', { infer: true });
    }

    get password() {
        return this.configService.get('DB_PASSWORD', { infer: true });
    }

    get user() {
        return this.configService.get('DB_USER', { infer: true });
    }

    get type() {
        return this.configService.get('DB_TYPE', { infer: true });
    }
}
