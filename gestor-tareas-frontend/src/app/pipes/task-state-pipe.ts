import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/task.model';

@Pipe({
  name: 'taskState',
  standalone: true
})
export class TaskStatePipe implements PipeTransform {

  transform(status: Status): string {
    switch (status) {
      case 'Completed':  return 'Completada';
      case 'Pending':    return 'Pendiente';
      case 'InProgress': return 'En progreso';
      case 'Cancelled':  return 'Cancelada';
    }
  }
}