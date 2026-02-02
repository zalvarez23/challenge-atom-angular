import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NewTaskComponent } from './new-task.component';
import { SaveTaskUseCase } from 'src/domain/usecases/save-task.usecase';
import { UpdateTasksUseCase } from 'src/domain/usecases/update-task.usecase';
import { TasksModel } from 'src/domain/models/task.model';

const mockTask: TasksModel = {
  id: '1',
  title: 'Tarea',
  description: 'Descripción',
  completed: false,
  createdAt: '2024-01-01',
  userId: 'user-1',
};

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let saveTaskSpy: jasmine.Spy;
  let updateTaskSpy: jasmine.Spy;

  beforeEach(async () => {
    const mockSaveTask = jasmine.createSpyObj('SaveTaskUseCase', ['execute']);
    const mockUpdateTask = jasmine.createSpyObj('UpdateTasksUseCase', [
      'execute',
    ]);
    mockSaveTask.execute.and.returnValue(of(mockTask));
    mockUpdateTask.execute.and.returnValue(of(mockTask));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [NewTaskComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SaveTaskUseCase, useValue: mockSaveTask },
        { provide: UpdateTasksUseCase, useValue: mockUpdateTask },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
      ],
    }).compileComponents();

    saveTaskSpy = mockSaveTask.execute;
    updateTaskSpy = mockUpdateTask.execute;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save new task and navigate', () => {
    component.onHandlerNewTask(mockTask);
    expect(saveTaskSpy).toHaveBeenCalledWith(mockTask);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should update task when in edit mode', () => {
    component.task = mockTask;
    component.isEdit = true;
    component.onHandlerNewTask({
      ...mockTask,
      title: 'Título actualizado',
    });
    expect(updateTaskSpy).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
