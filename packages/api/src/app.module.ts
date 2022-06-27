import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

@Module({
    controllers: [AppController],
    imports: [ConfigModule.forRoot()],
})
export class AppModule {}
