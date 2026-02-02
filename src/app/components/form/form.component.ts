import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksModel } from 'src/domain/models/task.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  @Input() task?: TasksModel | null;
  @Output() handlerNewTask = new EventEmitter<TasksModel>();
  public registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      completed: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.registroForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed,
      });
    }
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const newTasks = this.registroForm.value as TasksModel;
      this.handlerNewTask.emit(newTasks);
    }
  }
}
