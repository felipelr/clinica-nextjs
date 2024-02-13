import { EnvHelper, EnvVariables } from "../enviromentHelper/envHelper";
import { IJwtHelper, JwtOptions, JwtPayload } from "./jwtHelperInterface"
import * as jose from 'jose'

export class JwtHelper implements IJwtHelper {
    async sign(payload: JwtPayload, options: JwtOptions) {
        try {
            
            const secret = new TextEncoder().encode(EnvHelper.getVariable(EnvVariables.NEXT_JWT_KEY));
            const alg = "HS256";
            return await new jose.SignJWT(payload)
                .setProtectedHeader({ alg })
                .setExpirationTime(options.exp)
                .setIssuedAt()
                .setSubject(payload.sub)
                .sign(secret);
        } catch (error) {
            throw error;
        }
    }
    async verify(token: string) {
        try {
            const secret = new TextEncoder().encode(EnvHelper.getVariable(EnvVariables.NEXT_JWT_KEY));
            return (await jose.jwtVerify(token, secret)).payload as any
        } catch (error) {
            console.error(error);
            throw new Error("Your token has expired.");
        }
    }
}