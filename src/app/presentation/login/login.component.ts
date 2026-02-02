import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent } from 'src/app/components/dialog-alert/dialog-alert.component';
import { FindUserUseCase } from 'src/domain/usecases/find-user.usecase';
import { SaveUserUseCase } from 'src/domain/usecases/save-user.usecase';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private findUser = inject(FindUserUseCase);
  private saveUser = inject(SaveUserUseCase);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  emailForm: FormGroup;
  loading = signal(false);

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

    this.loading.set(true);
    const email = this.emailForm.value.email;

    this.findUser.execute(email).subscribe({
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
    this.loading.set(false);
    this.router.navigate(['/tasks']);
  }

  private handleUserNotFound(err: unknown, email: string): void {
    if (err && typeof err === 'object' && 'status' in err && (err as { status: number }).status === 404) {
      this.createUser(email);
    } else {
      this.loading.set(false);
      console.error('Error al buscar usuario', err);
    }
  }

  private createUser(email: string): void {
    this.saveUser.execute(email).subscribe({
      next: (user) => {
        if (user?.id) {
          this.loading.set(false);
          this.openDialog(user.id);
        }
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error al crear el usuario', error);
      },
    });
  }
}
