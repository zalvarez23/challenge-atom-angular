import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { TasksModel } from 'src/domain/models/task.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  @Input() dataSource: TasksModel[] = [];
  @Output() handlerDeleteTask = new EventEmitter<string>();
  @Output() handlerChangeStatus = new EventEmitter<TasksModel>();

  isMobile = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches)
    ),
    { initialValue: false }
  );
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'completed',
    'actions',
  ];
  deleteTask(clientId: string) {
    this.handlerDeleteTask.emit(clientId);
  }
  onToggleCompleted(task: TasksModel) {
    this.handlerChangeStatus.emit(task);
  }
  onEditTask(task: TasksModel) {
    this.router.navigate(['/new-task'], {
      queryParams: { task: JSON.stringify(task) },
    });
  }
}
