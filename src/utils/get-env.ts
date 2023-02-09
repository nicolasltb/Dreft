import dotenv from 'dotenv';

dotenv.config();

export function getEnv(varname: string, defaultValue?: string): string | undefined {
    const envvar = process.env[varname] !== undefined ? process.env[varname] : defaultValue;

    return envvar;
}

export const isProd = getEnv('NODE_ENV', 'DEV')!.toUpperCase() === 'PROD';
