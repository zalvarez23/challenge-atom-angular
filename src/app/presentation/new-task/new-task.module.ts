import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskRoutingModule } from './new-task-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NewTaskComponent } from './new-task.component';
import { FormComponent } from '../../components/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [NewTaskComponent, FormComponent],
  imports: [
    CommonModule,
    NewTaskRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class NewTaskModule {}
