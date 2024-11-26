import { Observable } from 'rxjs';
import { TasksRepository } from '../repositories/tasks.repository';
import { TasksModel } from '../models/task.model';
import { UseCase } from 'src/base/use-case';

export class GetTasksUseCase implements UseCase<null, TasksModel[]> {
  constructor(private tasksRepository: TasksRepository) {}

  execute(): Observable<TasksModel[]> {
    return this.tasksRepository.getTasks();
  }
}
