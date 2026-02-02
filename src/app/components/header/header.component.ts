import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  @Input() title: string;
  @Input() showButton: boolean;
  @Input() showBack: boolean;
  @Input() showSignOut: boolean;
  @Output() handlerDownloadTasks = new EventEmitter<void>();
  @Output() handlerSearchTasks = new EventEmitter<string>();
  private searchTask = new Subject<string>();
  filterTask: string;
  constructor() {
    this.title = '';
    this.showButton = true;
    this.showBack = false;
    this.showSignOut = false;
    this.filterTask = '';

    this.searchTask
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.handlerSearchTasks.emit(this.filterTask);
      });
  }

  onSearchTasks(): void {
    this.searchTask.next(this.filterTask);
  }
  downloadTasks() {
    this.handlerDownloadTasks.emit();
  }

  signOut() {
    this.authService.clearAuth();
    this.router.navigate(['/']);
  }
}
