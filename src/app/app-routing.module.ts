import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./presentation/tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new-task',
    loadChildren: () =>
      import('./presentation/new-task/new-task.module').then(
        (m) => m.NewTaskModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
