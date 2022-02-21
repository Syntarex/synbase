import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ensure } from "@synbase/shared";
import { AuthGuard, KeycloakConnectModule, RoleGuard } from "nest-keycloak-connect";
import { AppController } from "./app.controller";
import { DiscordModule } from "./discord/discord.module";
import { EnvMiddleware } from "./util/middleware/env.middleware";

@Module({
    controllers: [AppController],
    imports: [
        KeycloakConnectModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                authServerUrl: ensure(configService.get("KEYCLOAK_URL")),
                realm: ensure(configService.get("KEYCLOAK_REALM")),
                clientId: ensure(configService.get("API_KEYCLOAK_CLIENT_ID")),
                secret: ensure(configService.get("API_KEYCLOAK_CLIENT_SECRET")),
                useNestLogger: true,
            }),
        }),
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mariadb",
                host: ensure(configService.get("MARIADB_HOST")),
                port: Number(ensure(configService.get("MARIADB_PORT"))),
                username: ensure(configService.get("MARIADB_USERNAME")),
                password: ensure(configService.get("MARIADB_PASSWORD")),
                database: ensure(configService.get("MARIADB_DATABASE")),
                synchronize: true,
                entities: [],
            }),
        }),
        DiscordModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(EnvMiddleware).forRoutes("*");
    }
}
