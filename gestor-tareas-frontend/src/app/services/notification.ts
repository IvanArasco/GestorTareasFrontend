import { Injectable, signal } from '@angular/core';

export interface INotificationService {
  type: 'success' | 'error' | 'warning';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
private _notification = signal<INotificationService | null>(null);
readonly notification = this._notification.asReadonly();

  showError(message: string): void {
    this._notification.set({ type: 'error', message: message });
    // Limpiar automáticamente después de 4 segundos
    setTimeout(() => this._notification.set(null), 4000);
  }

  showSuccess(message: string): void {
    this._notification.set({ type: 'success', message: message });
    setTimeout(() => this._notification.set(null), 3000);
  }
}