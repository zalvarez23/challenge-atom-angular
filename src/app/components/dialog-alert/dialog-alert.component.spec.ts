import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAlertComponent } from './dialog-alert.component';

describe('DialogAlertComponent', () => {
  let component: DialogAlertComponent;
  let fixture: ComponentFixture<DialogAlertComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogAlertComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, DialogAlertComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit accepted and close dialog on onAccept', () => {
    spyOn(component.accepted, 'emit');
    component.onAccept();
    expect(component.accepted.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
