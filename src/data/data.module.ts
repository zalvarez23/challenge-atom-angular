import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRepository } from 'src/domain/repositories/tasks.repository';
import { GetTasksUseCase } from 'src/domain/usecases/get-tasks.usecase';
import { TasksImplementationRepository } from './repositories/task/task-implementation.repository';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SaveTaskUseCase } from 'src/domain/usecases/save-task.usecase';
import { DeleteTaskUseCase } from 'src/domain/usecases/delete-task.usecase';
import { UpdateTasksUseCase } from 'src/domain/usecases/update-task.usecase';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { FindUserUseCase } from 'src/domain/usecases/find-user.usecase';
import { UserImplementationRepository } from './repositories/user/user-implementation.repository';
import { SaveUserUseCase } from 'src/domain/usecases/save-user.usecase';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { AuthService } from 'src/app/services/auth.service';

const getTasksUseCaseFactory = (taskRepo: TasksRepository) =>
  new GetTasksUseCase(taskRepo);

const saveTasksUseCaseFactory = (taskRepo: TasksRepository) =>
  new SaveTaskUseCase(taskRepo);

const updateTaskUseCaseFactory = (taskRepo: TasksRepository) =>
  new UpdateTasksUseCase(taskRepo);

const deleteTasksUseCaseFactory = (taskRepo: TasksRepository) =>
  new DeleteTaskUseCase(taskRepo);

const findUserUseCaseFactory = (userRepo: UserRepository) =>
  new FindUserUseCase(userRepo);

const saveUserUseCaseFactory = (userRepo: UserRepository) =>
  new SaveUserUseCase(userRepo);

export const getTasksUseCaseProvider = {
  provide: GetTasksUseCase,
  useFactory: getTasksUseCaseFactory,
  deps: [TasksRepository],
};

export const saveTasksUseCaseProvider = {
  provide: SaveTaskUseCase,
  useFactory: saveTasksUseCaseFactory,
  deps: [TasksRepository],
};

export const deleteTasksUseCaseProvider = {
  provide: DeleteTaskUseCase,
  useFactory: deleteTasksUseCaseFactory,
  deps: [TasksRepository],
};

export const updateTaskUseCaseProvider = {
  provide: UpdateTasksUseCase,
  useFactory: updateTaskUseCaseFactory,
  deps: [TasksRepository],
};

export const findUserUseCaseProvider = {
  provide: FindUserUseCase,
  useFactory: findUserUseCaseFactory,
  deps: [UserRepository],
};

export const saveUserUseCaseProvider = {
  provide: SaveUserUseCase,
  useFactory: saveUserUseCaseFactory,
  deps: [UserRepository],
};

export const authInitializer = (auth: AuthService) => () => auth.initialize();

@NgModule({
  providers: [
    HttpClientModule,
    AuthService,
    getTasksUseCaseProvider,
    saveTasksUseCaseProvider,
    deleteTasksUseCaseProvider,
    updateTaskUseCaseProvider,
    findUserUseCaseProvider,
    saveUserUseCaseProvider,
    {
      provide: TasksRepository,
      useClass: TasksImplementationRepository,
    },
    {
      provide: UserRepository,
      useClass: UserImplementationRepository,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  declarations: [],
  imports: [CommonModule],
})
export class DataModule {}
