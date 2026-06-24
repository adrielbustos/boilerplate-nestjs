import { Repository } from '@/domain/persistency';
import { User } from './user.entity';

export abstract class UserRepository extends Repository<User> {}
