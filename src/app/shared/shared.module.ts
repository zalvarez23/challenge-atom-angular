import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
