import { TypeOrmAdapter } from '@/infrastructure/adapters/persistency';
import { User } from '../user.entity';

export class UserRepository extends TypeOrmAdapter<User> {}
