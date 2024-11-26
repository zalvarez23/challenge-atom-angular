import { Component, OnInit, inject } from '@angular/core';
import { TasksModel } from 'src/domain/models/task.model';
import { DeleteTaskUseCase } from 'src/domain/usecases/delete-task.usecase';
import { GetTasksUseCase } from 'src/domain/usecases/get-tasks.usecase';
import * as pdfMake from 'pdfmake/build/pdfmake';
import {
  DISPLAYED_COLUMNS,
  HEADER_PDF,
  ROBOTO_FONT,
} from 'src/constans/constans';
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
  private dataSourceC: TasksModel[];
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  dataSource: TasksModel[];
  constructor() {
    this.dataSource = [];
    this.dataSourceC = [];
  }

  getClients() {
    this.getTasks.execute().subscribe((tasks) => {
      this.dataSource = tasks;
      this.dataSourceC = [...tasks];
    });
  }
  onHandlerDeleteTask(idTask: string) {
    this.deleteTask.execute(idTask).subscribe((_) => {
      this.dataSource = this.dataSource.filter((task) => task.id !== idTask);
    });
  }

  onHandlerChangeStatus(task: TasksModel) {
    this.updateTask.execute(task).subscribe();
  }

  getMatTableContent() {
    const content = {
      head: HEADER_PDF,
      body: this.dataSource.map((item) => [
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
    this.dataSource = this.dataSourceC.filter((data) =>
      data.description.toUpperCase().includes(value.toUpperCase())
    );
  }
  ngOnInit(): void {
    this.getClients();
  }
}
