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
  const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (totalDays < 0) return `Vencida hace ${this.format(Math.abs(totalDays), today, true)}`;
  if (totalDays === 0) return 'Vence hoy';
  if (totalDays === 1) return 'Vence mañana';

  return `Vence en: ${this.format(totalDays, today, false)}`;
}

private format(totalDays: number, from: Date, expired: boolean): string {
  const base = expired
    ? new Date(from.getTime() - totalDays * 86400000)
    : from;

  const target = expired
    ? from
    : new Date(from.getTime() + totalDays * 86400000);

  let years = target.getFullYear() - base.getFullYear();
  let months = target.getMonth() - base.getMonth();
  let days = target.getDate() - base.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? 'día' : 'días'}`);

  return parts.join(', ');
}
}
