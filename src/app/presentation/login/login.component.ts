import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent } from 'src/app/components/dialog-alert/dialog-alert.component';
import { FindUserUseCase } from 'src/domain/usecases/find-user.usecase';
import { SaveUserUseCase } from 'src/domain/usecases/save-user.usecase';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuthResponse } from 'src/domain/repositories/user.repository';

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
  private authService = inject(AuthService);

  emailForm: FormGroup;
  loading = signal(false);

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openDialog(user: UserAuthResponse): void {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.accepted.subscribe(async () => {
      await this.authService.setCustomToken(user.customToken, user.id);
      this.router.navigate(['/tasks']);
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) return;

    this.loading.set(true);
    const email = this.emailForm.value.email;

    this.findUser.execute(email).subscribe({
      next: async (user) => {
        if (user?.id && user?.customToken) {
          await this.handleExistingUser(user);
        }
      },
      error: (err) => this.handleUserNotFound(err, email),
    });
  }

  private async handleExistingUser(user: UserAuthResponse): Promise<void> {
    try {
      await this.authService.setCustomToken(user.customToken, user.id);
      this.router.navigate(['/tasks']);
    } catch (err) {
      console.error('Error al iniciar sesión', err);
    } finally {
      this.loading.set(false);
    }
  }

  private handleUserNotFound(err: unknown, email: string): void {
    if (
      err &&
      typeof err === 'object' &&
      'status' in err &&
      (err as { status: number }).status === 404
    ) {
      this.createUser(email);
    } else {
      this.loading.set(false);
      console.error('Error al buscar usuario', err);
    }
  }

  private createUser(email: string): void {
    this.saveUser.execute(email).subscribe({
      next: (user) => {
        if (user?.id && user?.customToken) {
          this.loading.set(false);
          this.openDialog(user);
        }
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error al crear el usuario', error);
      },
    });
  }
}
