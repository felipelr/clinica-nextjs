export enum EnvVariables {
    NEXT_JWT_KEY = 'NEXT_JWT_KEY',
    NEXT_PUBLIC_AUTH_TOKEN = 'NEXT_PUBLIC_AUTH_TOKEN',
    NEXT_PUBLIC_ROOT_DOMAIN = 'NEXT_PUBLIC_ROOT_DOMAIN',
    NEXT_DATABASE_URL = 'NEXT_DATABASE_URL',
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX = 'NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX'
}

export class EnvHelper {
    static getVariable(name: string) {
        return process.env[name]
    }
}