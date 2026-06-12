import { ORDER_DIRECTION } from '@/application/pagination';
import { QueryResult } from './result';
import { BaseEntity } from '../entity';

export abstract class Repository<T extends BaseEntity> {
  abstract save(entity: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(query: {
    pagination: { page: number; limit: number };
    order?: { key: keyof T | 'id'; direction: ORDER_DIRECTION }[];
    where?: Partial<T>;
  }): Promise<QueryResult<T[]>>;
  abstract update(id: string, entity: Partial<T>): Promise<boolean>;
  abstract delete(id: string): Promise<void>;
}
