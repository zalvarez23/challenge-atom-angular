import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { FindUserUseCase } from 'src/domain/usecases/find-user.usecase';
import { SaveUserUseCase } from 'src/domain/usecases/save-user.usecase';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let findUserSpy: jasmine.Spy;
  let saveUserSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const mockFindUser = jasmine.createSpyObj('FindUserUseCase', ['execute']);
    const mockSaveUser = jasmine.createSpyObj('SaveUserUseCase', ['execute']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    mockFindUser.execute.and.returnValue(of(null));
    mockSaveUser.execute.and.returnValue(of(null));
    dialogSpy.open.and.returnValue({
      componentInstance: { accepted: of(undefined) },
      close: () => {},
    } as any);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FindUserUseCase, useValue: mockFindUser },
        { provide: SaveUserUseCase, useValue: mockSaveUser },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    findUserSpy = mockFindUser.execute;
    saveUserSpy = mockSaveUser.execute;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when form is invalid', () => {
    component.emailForm.setValue({ email: '' });
    component.onSubmit();
    expect(findUserSpy).not.toHaveBeenCalled();
  });

  it('should call findUser when form is valid', () => {
    component.emailForm.setValue({ email: 'test@test.com' });
    component.onSubmit();
    expect(findUserSpy).toHaveBeenCalledWith('test@test.com');
  });

  it('should navigate to tasks when user exists', () => {
    findUserSpy.and.returnValue(of({ id: 'user-1', email: 'test@test.com' }));
    component.emailForm.setValue({ email: 'test@test.com' });
    component.onSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should create user when findUser returns 404', () => {
    findUserSpy.and.returnValue(
      throwError(() => ({ status: 404 }))
    );
    saveUserSpy.and.returnValue(
      of({ id: 'new-user-1', email: 'new@test.com' })
    );
    component.emailForm.setValue({ email: 'new@test.com' });
    component.onSubmit();
    expect(saveUserSpy).toHaveBeenCalledWith('new@test.com');
  });
});
