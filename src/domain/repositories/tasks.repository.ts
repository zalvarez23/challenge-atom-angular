import { Observable } from 'rxjs';
import { TasksModel } from '../models/task.model';

export abstract class TasksRepository {
  abstract getTasks(): Observable<TasksModel[]>;
  abstract saveTask(task: TasksModel): Observable<TasksModel | undefined>;
  abstract updateTask(task: TasksModel): Observable<TasksModel | undefined>;
  abstract deleteClient(taskId: string): Observable<TasksModel | undefined>;
}
