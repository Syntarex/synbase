import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeOrmService } from "../util/service/typeorm.service";
import { DiscordVerification } from "./model/discord-verification.entity";

@Injectable()
export class DiscordVerificationService extends TypeOrmService<DiscordVerification> {
    constructor(@InjectRepository(DiscordVerification) protected readonly repository: Repository<DiscordVerification>) {
        super(repository);
    }
}
