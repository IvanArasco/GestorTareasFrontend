import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../models/task.model';

@Pipe({
  name: 'taskPriority',
  standalone: true
})
export class TaskPriorityPipe implements PipeTransform {
  transform(prio: Priority): string {
      switch (prio) {
        case Priority.Low:      return 'Baja';
        case Priority.Medium:   return 'Media';
        case Priority.High:     return 'Alta';
        case Priority.Critical: return 'Urgente';
      }
    }
}
