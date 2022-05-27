import _ from "lodash";
import { DeepPartial, Repository } from "typeorm";
import { Resource } from "../model/resource.entity";

export abstract class TypeOrmService<TEntity extends Resource> {
    constructor(protected readonly repository: Repository<TEntity>) {}

    public async select(filter: DeepPartial<TEntity>): Promise<TEntity[]> {
        return this.repository.find({
            where: filter,
        });
    }

    public async getByIds(ids: string[]): Promise<TEntity[]> {
        return this.repository.findByIds(ids);
    }

    public async get(id: string): Promise<TEntity | null> {
        const entity: TEntity | undefined = await this.repository.findOne(id);

        if (_.isUndefined(entity)) {
            return null;
        }

        return entity;
    }

    public async count(filter: DeepPartial<TEntity>): Promise<number> {
        return this.repository.count({ where: filter });
    }

    public async exists(id: string): Promise<boolean> {
        return (await this.repository.count({ where: { id } })) > 0;
    }

    public async create(value: DeepPartial<TEntity>): Promise<TEntity> {
        let entity: TEntity | null = await this.repository.save(await this.transformOnSave(value));

        entity = await this.get(entity.id);

        if (_.isNull(entity)) {
            throw new Error("Die gespeicherte Entität konnte nicht gefunden werden.");
        }

        return entity;
    }

    public async update(id: string, value: DeepPartial<TEntity>): Promise<TEntity | null> {
        const entity: TEntity | null = await this.get(id);

        if (_.isNull(entity)) {
            return null;
        }

        const update = _.merge(entity, await this.transformOnSave(value));

        await this.repository.save(update);

        return this.get(id);
    }

    public async delete(id: string): Promise<boolean> {
        const entity: TEntity | null = await this.get(id);

        if (_.isNull(entity)) {
            return false;
        }

        await this.repository.remove(entity);

        return true;
    }

    /** Überschreibe diese Funktion um das Create- oder Update-Objekt vor der Nutzung zu transformieren. */
    protected async transformOnSave(value: DeepPartial<TEntity>): Promise<DeepPartial<TEntity>> {
        return value;
    }
}
