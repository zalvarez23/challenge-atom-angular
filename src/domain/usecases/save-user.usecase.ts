import { Observable } from 'rxjs';
import {
  UserRepository,
  UserAuthResponse,
} from '../repositories/user.repository';
import { UseCase } from 'src/base/use-case';

export class SaveUserUseCase implements UseCase<string, UserAuthResponse | null> {
  constructor(private userRepository: UserRepository) {}

  execute(email: string): Observable<UserAuthResponse | null> {
    return this.userRepository.saveUser(email);
  }
}
