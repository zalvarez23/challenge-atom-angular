import { TasksModel } from 'src/domain/models/task.model';
import { TasksEntity } from '../entities/task-repository.entity';
import { Mapper } from 'src/base/mapper';
import { formatTimestamp } from 'src/utils/formats';

export class ClientImplementationRepositoryMapper extends Mapper<
  TasksEntity,
  TasksModel
> {
  mapFrom(param: TasksEntity): TasksModel {
    return {
      id: param.id,
      completed: param.completed,
      createdAt: formatTimestamp(param.createdAt),
      description: param.description,
      title: param.title,
      userId: param.userId,
    };
  }

  mapTo(param: TasksModel): TasksEntity {
    return {
      id: param.id,
      completed: param.completed,
      createdAt: param.createdAt, // Ya es string formateado desde el dominio
      description: param.description,
      title: param.title,
      userId: param.userId,
    };
  }
}
