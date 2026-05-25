import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/task.model';

@Pipe({
  name: 'taskState',
  standalone: true
})
export class TaskStatePipe implements PipeTransform {

  transform(status: Status): string {
    switch (status) {
      case Status.Completed:  return 'Completada';
      case Status.Pending:    return 'Pendiente';
      case Status.InProgress: return 'En progreso';
      case Status.Cancelled:  return 'Cancelada';
    }
  }
}