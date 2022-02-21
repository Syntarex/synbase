import { IResource } from "@synbase/shared";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export abstract class Resource implements IResource {
    constructor(initial?: any) {
        Object.assign(this, initial);
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @VersionColumn()
    version: number;
}
