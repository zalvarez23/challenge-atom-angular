import { Injectable } from '@angular/core';
import { TasksRepository } from 'src/domain/repositories/tasks.repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TasksModel } from 'src/domain/models/task.model';
import { Observable, map } from 'rxjs';
import { ClientImplementationRepositoryMapper } from './mappers/task-repository.mapper';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksImplementationRepository extends TasksRepository {
  userMapper = new ClientImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getTasks(): Observable<TasksModel[]> {
    return this.http
      .get<TasksModel[]>(`${environment.apiUrl}/tasks`)
      .pipe(
        map((response) => response.map((task) => this.userMapper.mapFrom(task)))
      );
  }

  saveTask(task: TasksModel): Observable<TasksModel | undefined> {
    return this.http.post<TasksModel | undefined>(
      `${environment.apiUrl}/tasks`,
      task
    );
  }

  updateTask(task: TasksModel): Observable<TasksModel | undefined> {
    return this.http.put<TasksModel | undefined>(
      `${environment.apiUrl}/tasks/${task.id}`,
      task
    );
  }

  deleteClient(taskId: string): Observable<TasksModel | undefined> {
    return this.http.delete<TasksModel | undefined>(
      `${environment.apiUrl}/tasks/${taskId}`
    );
  }
}
