import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertComponent } from './dialog-alert.component';

describe('DialogAlertComponent', () => {
  let component: DialogAlertComponent;
  let fixture: ComponentFixture<DialogAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogAlertComponent]
    });
    fixture = TestBed.createComponent(DialogAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
