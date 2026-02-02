import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form.component';
import { TasksModel } from 'src/domain/models/task.model';

const mockTask: TasksModel = {
  id: '1',
  title: 'Tarea test',
  description: 'Descripción test',
  completed: true,
  createdAt: '2024-01-01',
  userId: 'user-1',
};

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReactiveFormsModule],
      declarations: [FormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form when task input changes', () => {
    component.task = mockTask;
    component.ngOnChanges({
      task: {
        currentValue: mockTask,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.registroForm.get('title')?.value).toBe('Tarea test');
    expect(component.registroForm.get('description')?.value).toBe(
      'Descripción test'
    );
    expect(component.registroForm.get('completed')?.value).toBe(true);
  });

  it('should emit handlerNewTask when form is valid', () => {
    spyOn(component.handlerNewTask, 'emit');
    component.registroForm.setValue({
      title: 'Nueva tarea',
      description: 'Nueva descripción',
      completed: false,
    });
    component.onSubmit();
    expect(component.handlerNewTask.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Nueva tarea',
        description: 'Nueva descripción',
        completed: false,
      })
    );
  });

  it('should not emit when form is invalid', () => {
    spyOn(component.handlerNewTask, 'emit');
    component.registroForm.setValue({
      title: '',
      description: '',
      completed: false,
    });
    component.onSubmit();
    expect(component.handlerNewTask.emit).not.toHaveBeenCalled();
  });
});
