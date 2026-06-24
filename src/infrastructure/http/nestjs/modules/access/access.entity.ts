import { Column, Entity } from 'typeorm';

import { Access as AccessDomain } from '@/domain/modules/access';

import { TypeormBaseEntity } from '@/infrastructure/adapters/persistency/typeorm/base.entity';

@Entity()
export class Access extends TypeormBaseEntity implements AccessDomain {
  @Column({ unique: true })
  declare name: string;
}
