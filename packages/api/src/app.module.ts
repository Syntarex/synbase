import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ensure } from "@synbase/shared";
import { Request } from "express";
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from "nest-keycloak-connect";
import { AppController } from "./app.controller";
import { DiscordCommandModule } from "./discord-command/discord-command.module";
import { DiscordVerificationModule } from "./discord-verification/discord-verification.module";
import { DiscordVerification } from "./discord-verification/model/discord-verification.entity";
import { ImageModule } from "./image/image.module";
import { Image } from "./image/model/image.entity";
import { Profile } from "./profile/model/profile.entity";
import { ProfileModule } from "./profile/profile.module";
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
                clientId: ensure(configService.get("KEYCLOAK_CLIENT_ID")),
                secret: ensure(configService.get("KEYCLOAK_CLIENT_SECRET")),
                useNestLogger: true,
            }),
        }),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                limits: {
                    files: 1,
                    fileSize: ensure(configService.get("API_IMAGE_SIZE_LIMIT")),
                },
                fileFilter: (req: Request, file, cb) => {
                    const { mimetype } = file;

                    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];

                    if (!allowedFileTypes.includes(mimetype)) {
                        cb(new Error("Nur .png, .jpg und .jpeg sind erlaubt."), false);

                        return;
                    }

                    cb(null, true);
                },
            }),
            inject: [ConfigService],
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
                entities: [DiscordVerification, Profile, Image],
            }),
        }),
        DiscordCommandModule,
        DiscordVerificationModule,
        ProfileModule,
        ImageModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
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
