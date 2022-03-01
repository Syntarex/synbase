import { Injectable } from "@nestjs/common";
import { TypeOrmService } from "../util/service/typeorm.service";
import { DiscordVerification } from "./model/discord-verification.entity";

@Injectable()
export class DiscordVerificationService extends TypeOrmService<DiscordVerification> {}
