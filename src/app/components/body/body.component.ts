import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TasksModel } from 'src/domain/models/task.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  @Input() dataSource: TasksModel[];
  @Output() handlerDeleteTask = new EventEmitter<string>();
  @Output() handlerChangeStatus = new EventEmitter<TasksModel>();

  isMobile: boolean;
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'completed',
    'actions',
  ];
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.dataSource = [];
    this.isMobile = false;
  }
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
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
