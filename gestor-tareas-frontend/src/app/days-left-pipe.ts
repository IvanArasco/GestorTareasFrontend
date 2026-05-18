import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeft',
  standalone: true
})
export class DaysLeftPipe implements PipeTransform {
  transform(ExpirationDate: string | Date | null): string {
   const today = new Date();
  const limit = new Date(ExpirationDate!);

  const difference = limit.getTime() - today.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (days < 0) return `Vencida hace ${Math.abs(days)} días`;
  if (days === 0) return 'Vence hoy';
  if (days === 1) return 'Vence mañana';
    return `${days} días restantes`;
  }
}
