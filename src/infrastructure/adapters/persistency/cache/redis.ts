import { Repository } from '@/domain/persistency';
import { TypeOrmAdapter } from '../typeorm/repository';
import { BaseEntity } from '@/domain/entities';

export class RedisAdapter<T extends BaseEntity>
  extends TypeOrmAdapter<T>
  implements Repository<T> {}
