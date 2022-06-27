import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";

@Module({
    controllers: [AppController],
    imports: [ConfigModule.forRoot(), AuthModule],
})
export class AppModule {}
