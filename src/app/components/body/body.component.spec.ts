import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './body.component';
import { TasksModel } from 'src/domain/models/task.model';

const mockTasks: TasksModel[] = [
  {
    id: '1',
    title: 'Tarea 1',
    description: 'Descripción 1',
    completed: false,
    createdAt: '2024-01-01',
    userId: 'user-1',
  },
];

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const breakpointObserverMock = {
      observe: jasmine.createSpy().and.returnValue(
        of({ matches: false, breakpoints: {} })
      ),
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [BodyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    component.dataSource = mockTasks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit handlerDeleteTask when deleteTask is called', () => {
    spyOn(component.handlerDeleteTask, 'emit');
    component.deleteTask('1');
    expect(component.handlerDeleteTask.emit).toHaveBeenCalledWith('1');
  });

  it('should emit handlerChangeStatus when onToggleCompleted is called', () => {
    spyOn(component.handlerChangeStatus, 'emit');
    component.onToggleCompleted(mockTasks[0]);
    expect(component.handlerChangeStatus.emit).toHaveBeenCalledWith(
      mockTasks[0]
    );
  });

  it('should navigate to new-task with query params when onEditTask is called', () => {
    component.onEditTask(mockTasks[0]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/new-task'], {
      queryParams: { task: JSON.stringify(mockTasks[0]) },
    });
  });
});
