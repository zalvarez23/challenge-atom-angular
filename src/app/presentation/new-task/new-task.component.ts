import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksModel } from 'src/domain/models/task.model';
import { SaveTaskUseCase } from 'src/domain/usecases/save-task.usecase';
import { UpdateTasksUseCase } from 'src/domain/usecases/update-task.usecase';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  private saveTask = inject(SaveTaskUseCase);
  private updateTask = inject(UpdateTasksUseCase);
  private router = inject(Router);
  task: TasksModel | null;
  isEdit: boolean;
  constructor(private route: ActivatedRoute) {
    this.task = null;
    this.isEdit = false;
  }

  onHandlerNewTask(task: TasksModel) {
    if (this.isEdit) {
      this.updateTask.execute({ ...this.task, ...task }).subscribe((_) => {
        this.router.navigate(['/tasks']);
      });
      return;
    }
    this.saveTask.execute(task).subscribe((_) => {
      this.router.navigate(['/tasks']);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['task']) {
        this.task = JSON.parse(params['task']);
        this.isEdit = true;
      }
    });
  }
}
