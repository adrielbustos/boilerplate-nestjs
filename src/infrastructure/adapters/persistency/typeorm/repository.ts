import {
  FindOptionsOrder,
  FindOptionsWhere,
  Repository as TypeOrmRepository,
} from 'typeorm';
import { QueryResult, Repository } from '@/domain/persistency';
import { BaseEntityI } from '@/domain/common/entities';
import { ORDER_DIRECTION } from '@/application/pagination';

export class TypeOrmAdapter<T extends BaseEntityI> implements Repository<T> {
  constructor(private readonly repository: TypeOrmRepository<T>) {}

  save(entity: T): Promise<T> {
    return this.repository.save(this.repository.create(entity));
  }

  findById(id: string): Promise<T | null> {
    const query = {};
    if ('id' in this.repository.create()) {
      query['id'] = id;
      return this.repository.findOneBy(query);
    }
    return Promise.resolve(null);
  }

  async findAll(query: {
    pagination: { page: number; limit: number };
    order?: { key: keyof T; direction: ORDER_DIRECTION }[] | undefined;
    where?: Partial<T> | undefined;
  }): Promise<QueryResult<T[]>> {
    const { pagination, order, where } = query;
    const skip = (pagination.page - 1) * pagination.limit;

    const orderBy: FindOptionsOrder<T> = {};
    const e = this.repository.create();
    if (order) {
      order.forEach((o) => {
        if (o.key in e) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          orderBy[o.key] = o.direction.toUpperCase() as any;
        }
      });
    }

    const [data, total] = await this.repository.findAndCount({
      where: where || {},
      skip,
      take: pagination.limit,
      order: Object.keys(orderBy).length ? orderBy : undefined,
    });

    return {
      data,
      total,
    };
  }

  async update(id: string, entity: Partial<T>): Promise<boolean> {
    const result = await this.repository.update(
      {
        id: id,
      } as FindOptionsWhere<T>,
      entity,
    );
    return result.affected !== undefined && result.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({
      id: id,
    } as FindOptionsWhere<T>);
    return result.affected ? result.affected > 0 : false;
  }
}
