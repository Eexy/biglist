import { Config } from 'drizzle-kit';

export default {
    schema: './src/drizzle/schema.ts',
    out: './migrations',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
} satisfies Config;
