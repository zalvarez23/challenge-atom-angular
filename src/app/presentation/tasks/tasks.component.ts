import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { TasksModel } from 'src/domain/models/task.model';
import { DeleteTaskUseCase } from 'src/domain/usecases/delete-task.usecase';
import { GetTasksUseCase } from 'src/domain/usecases/get-tasks.usecase';
import * as pdfMake from 'pdfmake/build/pdfmake';
import {
  DISPLAYED_COLUMNS,
  HEADER_PDF,
  ROBOTO_FONT,
} from 'src/constants/constants';
import { UpdateTasksUseCase } from 'src/domain/usecases/update-task.usecase';

@Component({
  selector: 'app-tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  private getTasks = inject(GetTasksUseCase);
  private deleteTask = inject(DeleteTaskUseCase);
  private updateTask = inject(UpdateTasksUseCase);

  displayedColumns: string[] = DISPLAYED_COLUMNS;
  tasks = signal<TasksModel[]>([]);
  searchTerm = signal('');
  loadError = signal<string | null>(null);
  filteredTasks = computed(() => {
    const term = this.searchTerm().toUpperCase();
    const tasksList = this.tasks();
    return term
      ? tasksList.filter(
          (t) =>
            t.title.toUpperCase().includes(term) ||
            t.description.toUpperCase().includes(term)
        )
      : tasksList;
  });

  getClients() {
    this.loadError.set(null);
    this.getTasks.execute().subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: () =>
        this.loadError.set('Error al cargar las tareas. Intenta de nuevo.'),
    });
  }

  onHandlerDeleteTask(idTask: string) {
    this.deleteTask.execute(idTask).subscribe(() => {
      this.tasks.update((current) =>
        current.filter((task) => task.id !== idTask)
      );
    });
  }

  onHandlerChangeStatus(task: TasksModel) {
    this.updateTask.execute(task).subscribe();
  }

  getMatTableContent() {
    const content = {
      head: HEADER_PDF,
      body: this.filteredTasks().map((item) => [
        item.id,
        item.title,
        item.description,
        item.createdAt,
        item.completed ? 'Completado' : 'Pendiente',
      ]),
    };
    return content;
  }

  onHandlerDownloadTasks() {
    const content = this.getMatTableContent();
    const documentDefinition = {
      content: [
        {
          table: {
            body: content.body,
          },
        },
      ],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 12,
      },
      styles: {},
    };

    const fonts = {
      Roboto: {
        normal: ROBOTO_FONT,
      },
    };

    const tableLayouts = {
      customLayout: {
        hLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.widths.length ? 2 : 1;
        },
        hLineColor: function (i: any, node: any) {
          return i === 0 || i === node.table.body.length ? 'black' : 'gray';
        },
        vLineColor: function (i: any, node: any) {
          return i === 0 || i === node.table.widths.length ? 'black' : 'gray';
        },
      },
    };

    pdfMake.createPdf(documentDefinition, tableLayouts, fonts).open();
  }

  onHandlerSearchTasks(value: string): void {
    this.searchTerm.set(value);
  }

  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.getClients();
  }
}
