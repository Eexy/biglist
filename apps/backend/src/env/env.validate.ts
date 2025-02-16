import { envSchema } from './env.schema';

export function validate(config: Record<string, unknown>) {
    const res = envSchema.safeParse(config);

    if (!res.success) {
        throw new Error(JSON.stringify(res.error.errors));
    }

    return res.data;
}
