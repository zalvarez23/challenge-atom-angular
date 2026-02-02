import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { TasksComponent } from './tasks.component';
import { GetTasksUseCase } from 'src/domain/usecases/get-tasks.usecase';
import { DeleteTaskUseCase } from 'src/domain/usecases/delete-task.usecase';
import { UpdateTasksUseCase } from 'src/domain/usecases/update-task.usecase';
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

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let getTasksSpy: jasmine.Spy;
  let deleteTaskSpy: jasmine.Spy;

  beforeEach(async () => {
    const mockGetTasks = jasmine.createSpyObj('GetTasksUseCase', ['execute']);
    mockGetTasks.execute.and.returnValue(of(mockTasks));

    const mockDeleteTask = jasmine.createSpyObj('DeleteTaskUseCase', ['execute']);
    mockDeleteTask.execute.and.returnValue(of(undefined));

    const mockUpdateTask = jasmine.createSpyObj('UpdateTasksUseCase', [
      'execute',
    ]);
    mockUpdateTask.execute.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [TasksComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: GetTasksUseCase, useValue: mockGetTasks },
        { provide: DeleteTaskUseCase, useValue: mockDeleteTask },
        { provide: UpdateTasksUseCase, useValue: mockUpdateTask },
      ],
    }).compileComponents();

    getTasksSpy = mockGetTasks.execute;
    deleteTaskSpy = mockDeleteTask.execute;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(getTasksSpy).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
  });

  it('should filter tasks by search term', () => {
    component.tasks.set(mockTasks);
    component.onHandlerSearchTasks('Tarea');
    expect(component.filteredTasks().length).toBe(1);
    expect(component.filteredTasks()[0].title).toBe('Tarea 1');

    component.onHandlerSearchTasks('inexistente');
    expect(component.filteredTasks().length).toBe(0);
  });

  it('should filter by title and description', () => {
    component.tasks.set(mockTasks);
    component.onHandlerSearchTasks('Descripción');
    expect(component.filteredTasks().length).toBe(1);
  });

  it('should remove task on delete', () => {
    component.tasks.set([...mockTasks]);
    component.onHandlerDeleteTask('1');
    expect(deleteTaskSpy).toHaveBeenCalledWith('1');
    expect(component.tasks().length).toBe(0);
  });

  it('should set loadError when getTasks fails', () => {
    getTasksSpy.and.returnValue(throwError(() => new Error('API Error')));
    component.getClients();
    expect(component.loadError()).toContain('Error al cargar');
  });

  it('should clear loadError on retry', () => {
    component.loadError.set('Error previo');
    getTasksSpy.and.returnValue(of(mockTasks));
    component.getClients();
    expect(component.loadError()).toBeNull();
  });
});
