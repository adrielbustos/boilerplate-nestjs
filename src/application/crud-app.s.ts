import { Repository } from '@/domain/persistency';
import { APP_ERROR_TYPE, AppError } from '@/domain/apperror';
import { BaseEntity } from '@/domain/entities';
import Utils from '@/domain/utils/utils';

import { CreateInput, UpdateInput } from './inputs';
import { CreateOutput } from './outputs';
import { Page, PaginationOptions } from './pagination';
import { UpdateOutput } from './outputs/update.output';

export abstract class CRUDApplication<T extends BaseEntity> {
  public constructor(private readonly repository: Repository<T>) {}

  public async create(input: CreateInput<T>): Promise<CreateOutput<T>> {
    if (this.beforeCreate) {
      await this.beforeCreate(input);
    }
    const entity = await this.repository.save(input.data);
    if (this.afterCreate) {
      await this.afterCreate(new CreateOutput(entity));
    }
    return new CreateOutput<T>(entity);
  }

  public getById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  public async getAll(options: {
    where?: Partial<T>;
    pagination: PaginationOptions<T>;
  }): Promise<Page<T[]>> {
    const result = await this.repository.findAll({
      pagination: {
        page: options.pagination.page,
        limit: options.pagination.count,
      },
      order: options.pagination.order.map((o) => {
        return { key: o.by, direction: o.order };
      }),
      where: options.where,
    });
    return new Page({
      data: result.data,
      limit: options.pagination.count,
      page: options.pagination.page,
      total: result.total,
    });
  }

  public async update(input: UpdateInput<T>): Promise<UpdateOutput<T>> {
    if (this.beforeUpdate) {
      await this.beforeUpdate(input.id, input.data);
    }
    const entity = await this.repository.findById(input.id);
    if (!entity) {
      throw new AppError({
        type: APP_ERROR_TYPE.NOT_FOUND,
        message: `Entity with id ${input.id} not found`,
      });
    }
    const diff = Utils.objectDiff(entity, input.data);
    if (Object.keys(diff).length === 0) {
      return new UpdateOutput<T>(entity);
    }
    const updatedEntity = { ...entity, ...diff };
    await this.repository.update(input.id, updatedEntity);
    if (this.afterUpdate) {
      await this.afterUpdate(input.id, updatedEntity);
    }
    return new UpdateOutput<T>(updatedEntity);
  }

  public async delete(id: string): Promise<boolean> {
    if (this.beforeDelete) {
      await this.beforeDelete(id);
    }
    const result = await this.repository.delete(id);
    if (this.afterDelete) {
      await this.afterDelete(id);
    }
    return result;
  }

  protected beforeCreate?(input: CreateInput<T>): Promise<void> | void;
  protected beforeUpdate?(id: string, entity: Partial<T>): Promise<void> | void;
  protected beforeDelete?(id: string): Promise<void> | void;
  protected afterCreate?(output: CreateOutput<T>): Promise<void> | void;
  protected afterUpdate?(id: string, entity: Partial<T>): Promise<void> | void;
  protected afterDelete?(id: string): Promise<void> | void;
}
