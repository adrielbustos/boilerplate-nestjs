import { Column, Entity, OneToMany } from 'typeorm';

import { Role as RoleDomain } from '@/domain/modules/role';

import { TypeormBaseEntity } from '@/infrastructure/adapters/persistency/typeorm/base.entity';
import { Access } from '../access/access.entity';

@Entity()
export class Role extends TypeormBaseEntity implements RoleDomain {
  @Column({ unique: true })
  declare name: string;

  @OneToMany(() => Access, (access) => access.role, { cascade: true })
  declare access: Access[];
}
