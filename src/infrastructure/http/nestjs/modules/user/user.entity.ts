import { Column, Entity } from 'typeorm';

import { User as UserDomain } from '@/domain/modules/user';
import { TypeormBaseEntity } from '@/infrastructure/adapters/persistency/typeorm/base.entity';

@Entity()
export class User extends TypeormBaseEntity implements UserDomain {
  @Column({ unique: true })
  declare email: string;
  public constructor(entity?: Partial<User>) {
    super();
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
