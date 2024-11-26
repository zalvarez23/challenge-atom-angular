import { Observable } from 'rxjs';
import { TasksModel } from '../models/task.model';

export abstract class UserRepository {
  abstract findUser(email: string): Observable<{ id: string } | null>;
  abstract saveUser(email: string): Observable<{ id: string } | null>;
}
