import { Repository } from '@/domain/persistency';
import { BaseEntity } from '@/domain/common/entities';
import { TypeOrmAdapter } from '../typeorm/repository';

export class RedisAdapter<T extends BaseEntity>
  extends TypeOrmAdapter<T>
  implements Repository<T> {}
