import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeOrmService } from "../util/service/typeorm.service";
import { Points } from "./model/points.entity";

@Injectable()
export class PointsService extends TypeOrmService<Points> {
    constructor(@InjectRepository(Points) protected readonly repository: Repository<Points>) {
        super(repository);
    }
}
