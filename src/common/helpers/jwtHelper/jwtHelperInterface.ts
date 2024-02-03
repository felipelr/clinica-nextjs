export type JwtPayload = {
    sub: string
    email: string
    createdAt: string
}

export type JwtOptions = {
    exp: string
}

export interface IJwtHelper {
    sign(payload: JwtPayload, options: JwtOptions): Promise<string>
    verify(token: string): Promise<string>
}
