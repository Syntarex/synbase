import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface";
import { NestFactory, Reflector } from "@nestjs/core";
import { ensure } from "@synbase/shared";
import * as fs from "fs";
import "reflect-metadata";
import { AppModule } from "./app.module";
import { SSL } from "./constants";
import { QueryFailedFilter } from "./error/filter/query-failed.filter";

function getHttpsOptions(): HttpsOptions | undefined {
    const keyExists: boolean = fs.existsSync(SSL.KEY_PATH);
    const certExists: boolean = fs.existsSync(SSL.CERT_PATH);

    if (!keyExists || !certExists) {
        return undefined;
    }

    return {
        key: fs.readFileSync(SSL.KEY_PATH),
        cert: fs.readFileSync(SSL.CERT_PATH),
    };
}

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule, { httpsOptions: getHttpsOptions() });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useGlobalFilters(new QueryFailedFilter());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.enableCors({
        origin: [ensure(process.env.WEB_URL)],
        credentials: true,
    });

    await app.init();

    await app.listen(8082);
}

bootstrap();
