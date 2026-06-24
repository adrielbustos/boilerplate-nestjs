import { BaseEntity } from '@/domain/common/entities';
import { Role } from '../role';

export class User extends BaseEntity {
  email: string = '';

  role?: Role;
}
