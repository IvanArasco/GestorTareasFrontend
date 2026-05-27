import { Pipe, PipeTransform } from '@angular/core';
import { DevelopmentArea } from '../models/task.model';

@Pipe({
  name: 'taskDeveloparea',
})
export class TaskDevelopareaPipe implements PipeTransform {
   transform(area: DevelopmentArea): string {
      switch (area) {
        case DevelopmentArea.Frontend: return 'Front-end (Usuario)';
        case DevelopmentArea.Backend: return 'Back-end (Servidor)';
        case DevelopmentArea.BD: return 'Base de datos';
      }
    }
}