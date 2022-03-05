import { JWT } from "next-auth/jwt";

export interface IToken extends JWT {
    accessToken: string;
    refreshToken: string;
    userId: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    sub: string;
}
