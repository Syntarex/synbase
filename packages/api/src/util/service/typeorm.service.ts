import _ from "lodash";
import { DeepPartial, FindOptionsWhere, In, Repository } from "typeorm";
import { Resource } from "../model/resource.entity";

/* Check this issue and get rid of the workaround if it's fixed. */
/* https://github.com/typeorm/typeorm/issues/8939#issuecomment-1119476959 */
export abstract class TypeOrmService<TEntity extends Resource> {
    constructor(protected readonly repository: Repository<TEntity>) {}

    public async getAll(where: FindOptionsWhere<TEntity>): Promise<TEntity[]> {
        return this.repository.find({
            where,
        });
    }

    public async getByIds(ids: string[]): Promise<TEntity[]> {
        let where: FindOptionsWhere<TEntity> = {};

        where = Object.assign(where, { id: In(ids) });

        return this.repository.findBy(where);
    }

    public async get(id: string): Promise<TEntity | null> {
        let where: FindOptionsWhere<TEntity> = {};

        where = Object.assign(where, { id });

        return await this.repository.findOneBy(where);
    }

    public async count(where: FindOptionsWhere<TEntity>): Promise<number> {
        return this.repository.count({ where });
    }

    public async exists(id: string): Promise<boolean> {
        let where: FindOptionsWhere<TEntity> = {};

        where = Object.assign(where, { id });

        return (await this.repository.count({ where })) > 0;
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
