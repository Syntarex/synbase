import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface";
import { NestFactory, Reflector } from "@nestjs/core";
import { ensure } from "@synbase/shared";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { Constants } from "./constants";
import { QueryFailedFilter } from "./error/filter/query-failed.filter";

function getHttpsOptions(): HttpsOptions | undefined {
    const keyExists: boolean = fs.existsSync(Constants.SSL_KEY_PATH);
    const certExists: boolean = fs.existsSync(Constants.SSL_CERT_PATH);

    if (!keyExists || !certExists) {
        return undefined;
    }

    return {
        key: fs.readFileSync(Constants.SSL_KEY_PATH),
        cert: fs.readFileSync(Constants.SSL_CERT_PATH),
    };
}

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule, { httpsOptions: getHttpsOptions() });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
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
