import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css'],
})
export class DialogAlertComponent {
  @Output() accepted = new EventEmitter<void>();

  constructor(private dialogRef: MatDialogRef<DialogAlertComponent>) {}

  onAccept(): void {
    this.accepted.emit();
    this.dialogRef.close();
  }
}
