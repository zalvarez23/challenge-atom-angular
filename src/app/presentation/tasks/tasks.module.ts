import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TasksComponent } from './tasks.component';
import { BodyComponent } from '../../components/body/body.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [TasksComponent, BodyComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    LayoutModule,
  ],
})
export class TasksModule {}
