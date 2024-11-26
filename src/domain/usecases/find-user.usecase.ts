import { Observable } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';
import { UseCase } from 'src/base/use-case';

export class FindUserUseCase implements UseCase<string, { id: string } | null> {
  constructor(private userRepository: UserRepository) {}

  execute(email: string): Observable<{ id: string } | null> {
    return this.userRepository.findUser(email);
  }
}