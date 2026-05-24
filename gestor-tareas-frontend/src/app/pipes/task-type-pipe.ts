import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskType',
  standalone: true
})
export class TaskTypePipe implements PipeTransform {
  transform(type: string): string {
     switch (type) {
       case 'Bug':  return 'Error';
       case 'RecurringTask':    return 'Tarea recurrente';
       case 'Improvement': return 'Mejora';
       case 'NewFeature':  return 'Nueva func.';
       default: return type;
     }
   }
}
