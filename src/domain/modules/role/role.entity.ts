import { BaseEntity } from '@/domain/common/entities';
import { Access } from '../access/access.entity';

export class Role extends BaseEntity {
  name: string = '';

  access?: Access[] = [];
}
