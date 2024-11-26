import { Observable } from 'rxjs';
import { TasksRepository } from '../repositories/tasks.repository';
import { TasksModel } from '../models/task.model';
import { UseCase } from 'src/base/use-case';

export class SaveTaskUseCase
  implements UseCase<TasksModel, TasksModel | undefined>
{
  constructor(private taskRepository: TasksRepository) {}

  execute(taskModel: TasksModel): Observable<TasksModel | undefined> {
    return this.taskRepository.saveTask(taskModel);
  }
}
