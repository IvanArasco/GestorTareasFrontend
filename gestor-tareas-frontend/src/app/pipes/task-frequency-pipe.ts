import { Pipe, PipeTransform } from '@angular/core';
import { Frequency } from '../models/task.model';

@Pipe({
  name: 'taskFrequency',
  standalone: true
})
export class TaskFrequencyPipe implements PipeTransform {
  transform(frec: Frequency | undefined): string {
    switch (frec) {
      case Frequency.Daily: return 'Diaria';
      case Frequency.Weekly: return 'Semanal';
      case Frequency.Monthly: return 'Mensual';
      default: return 'Sin especificar';
    }
  }
}
