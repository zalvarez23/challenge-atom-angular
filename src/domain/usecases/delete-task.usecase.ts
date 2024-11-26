import { Observable } from 'rxjs';
import { TasksRepository } from '../repositories/tasks.repository';
import { TasksModel } from '../models/task.model';
import { UseCase } from 'src/base/use-case';

export class DeleteTaskUseCase
  implements UseCase<string, TasksModel | undefined>
{
  constructor(private taskRepository: TasksRepository) {}

  execute(taskId: string): Observable<TasksModel | undefined> {
    return this.taskRepository.deleteClient(taskId);
  }
}
