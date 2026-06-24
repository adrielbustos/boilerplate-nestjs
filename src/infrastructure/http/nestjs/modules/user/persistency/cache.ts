import { RedisAdapter } from '@/infrastructure/adapters/persistency';
import { User } from '../user.entity';

export class UserCache extends RedisAdapter<User> {}
