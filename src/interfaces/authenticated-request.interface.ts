import { Users } from 'src/users/users.entity';

export interface AuthenticatedRequest extends Request {
  user?: Partial<Users>;
}
