import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DialogAlertComponent } from 'src/app/components/dialog-alert/dialog-alert.component';
import { FindUserUseCase } from 'src/domain/usecases/find-user.usecase';
import { SaveUserUseCase } from 'src/domain/usecases/save-user.usecase';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private finsUser = inject(FindUserUseCase);
  private saveUser = inject(SaveUserUseCase);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  emailForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openDialog(userId: string): void {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.accepted.subscribe(() => {
      localStorage.setItem('userId', userId);
      this.router.navigate(['/tasks']);
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) return;

    this.loading = true;
    const email = this.emailForm.value.email;

    this.finsUser.execute(email).subscribe({
      next: (user) => {
        if (user?.id) {
          this.handleExistingUser(user.id);
        }
      },
      error: (err) => this.handleUserNotFound(err, email),
    });
  }

  private handleExistingUser(userId: string): void {
    localStorage.setItem('userId', userId);
    this.loading = false;
    this.router.navigate(['/tasks']);
  }

  private handleUserNotFound(err: any, email: string): void {
    if (err.status === 404) {
      this.createUser(email);
    } else {
      console.error('Error al buscar usuario', err);
    }
  }

  private createUser(email: string): void {
    this.saveUser.execute(email).subscribe({
      next: (user) => {
        if (user?.id) {
          this.openDialog(user.id);
        }
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
      },
    });
  }
}
