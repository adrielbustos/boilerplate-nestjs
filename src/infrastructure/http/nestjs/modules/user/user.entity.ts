import { BaseEntity } from '@/domain/entities';
import { TypeormBaseEntity } from '@/infrastructure/adapters/persistency/typeorm/base.entity';

export class User extends TypeormBaseEntity implements BaseEntity {
  email: string;
}
