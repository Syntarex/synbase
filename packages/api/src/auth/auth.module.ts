import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { PermissionsGuard } from "./guard/permissions.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [ConfigModule, PassportModule.register({ defaultStrategy: "jwt" })],
    providers: [JwtStrategy, PermissionsGuard],
    exports: [PassportModule],
})
export class AuthModule {}
