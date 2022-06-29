import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly configService: ConfigService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${configService.getOrThrow<string>("AUTH0_DOMAIN")}/.well-known/jwks.json`,
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: configService.getOrThrow<string>("AUTH0_AUDIENCE"),
            issuer: `https://${configService.getOrThrow<string>("AUTH0_DOMAIN")}/`,
            algorithms: ["RS256"],
        });
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}
