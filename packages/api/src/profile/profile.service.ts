import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeOrmService } from "../util/service/typeorm.service";
import { Profile } from "./model/profile.entity";

@Injectable()
export class ProfileService extends TypeOrmService<Profile> {
    constructor(@InjectRepository(Profile) protected readonly repository: Repository<Profile>) {
        super(repository);
    }
}
