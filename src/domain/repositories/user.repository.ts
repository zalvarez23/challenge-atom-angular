import { Observable } from 'rxjs';

export interface UserAuthResponse {
  id: string;
  customToken: string;
}

export abstract class UserRepository {
  abstract findUser(email: string): Observable<UserAuthResponse | null>;
  abstract saveUser(email: string): Observable<UserAuthResponse | null>;
}
