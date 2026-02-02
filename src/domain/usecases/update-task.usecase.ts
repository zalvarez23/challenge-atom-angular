import { Observable } from 'rxjs';
import { TasksRepository } from '../repositories/tasks.repository';
import { TasksModel } from '../models/task.model';
import { UseCase } from 'src/base/use-case';
import { TasksEntity } from 'src/data/repositories/task/entities/task-repository.entity';

export class UpdateTasksUseCase
  implements UseCase<TasksModel, TasksModel | undefined>
{
  constructor(private tasksRepository: TasksRepository) {}

  execute(taskModel: TasksModel): Observable<TasksModel | undefined> {
    return this.tasksRepository.updateTask(taskModel);
  }
}
