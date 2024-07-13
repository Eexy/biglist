import { z } from 'zod';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

export const loggerConfigSchema = z.object({
    LOG_TO_FILE: z.coerce.boolean().default(false),
});

@Injectable()
export class LoggerConfigService {
    constructor(
        private readonly configService: ConfigService<
            z.infer<typeof loggerConfigSchema>,
            true
        >,
    ) {}

    get logToFile() {
        return this.configService.get('LOG_TO_FILE', { infer: true });
    }
}
