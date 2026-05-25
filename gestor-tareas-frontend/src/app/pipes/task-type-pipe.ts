import { Pipe, PipeTransform } from '@angular/core';
import { TaskType } from '../models/task.model';

@Pipe({
  name: 'taskType',
  standalone: true
})
export class TaskTypePipe implements PipeTransform {
  transform(type: TaskType): string {
     switch (type) {
       case TaskType.Bug:           return 'Error';
       case TaskType.RecurringTask: return 'Tarea recurrente';
       case TaskType.Improvement:   return 'Mejora';
       case TaskType.NewFeature:    return 'Nueva func.';
       default: return type;
     }
   }
}
