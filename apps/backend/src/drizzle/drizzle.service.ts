import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

@Injectable()
export class DrizzleService {
    constructor(
        @Inject('POSTGRES_CONNECTION') public readonly db: PostgresJsDatabase,
    ) {}
}
