import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponseDto {
  token: string;
  expiresAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7001/api';

  // Signal privado — fuente de verdad del token
  private _token = signal<string | null>((localStorage.getItem('token')));

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

  // Signals públicos de solo lectura
  readonly token = this._token.asReadonly();
  readonly isAuth = computed(() => this._token() !== null);

  private readonly _payload = computed(() => {
    const token = this._token();
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  });

  readonly userId = computed(() => {
    const id = this._payload()?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return id ? Number(id) : null;
  });

  readonly isAdmin = computed(() =>
    this._payload()?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
  );

  login(email: string, password: string) {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/login`,
      { email, password }
    ).pipe(
      // tap guarda el token cuando el login tiene éxito
      tap(response => { this.setToken(response.token); })
    )
  }

  register(username: string, password: string, email: string, birthdate: string) {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/register`,
      { username, email, password, birthdate }
    ).pipe(
      // tap guarda el token cuando el register tiene éxito y luego inicia sesión
      tap(response => { this.setToken(response.token); })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this._token.set(null);
  }
}