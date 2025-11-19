// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080/api/auth/login'; // constante de la clase
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  username = signal<string | null>(null);

  itsAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient) {// Solo ejecuta esta parte si estamos en el navegador
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token && this.isTokenValid(token)) {
        this.itsAuthenticated.set(true);
        const decoded: any = jwtDecode(token);
        this.username.set(decoded?.nombre || decoded?.sub || null);
      }
    }

  }

  // Login
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { correo, contrasena }).pipe(
      tap((response: Auth) => {
        if (this.isBrowser) {
          //Estoy controlando la persistencia con el token 
          localStorage.setItem('token', response.token);
          /* No hay necesidad de hacer esto, esto es lo que muestra las keys en el local storage
            localStorage.setItem('user', JSON.stringify(response.user));*/
        }

        //en las siguientes dos lineas se agrega el username luego de que se loguea
        const decoded: any = jwtDecode(response.token);
        this.username.set(decoded?.nombre || decoded?.sub || null);


        this.itsAuthenticated.set(true);
        this.scheduleTokenCheck(); // reprograma al hacer login
      })
    );
  }

  // Logout
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.itsAuthenticated.set(false);
  }

  // Obtener usuario
  getUser(): Auth | null {
    if (!this.isBrowser) return null;

    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      // Cambia 'nombre' por la clave real que viene en tu token (por ejemplo 'sub' o 'email')
      return decoded?.nombre || decoded?.sub || null;
    } catch (error) {
      console.error('Error al obtener el nombre del token', error);
      return null;
    }
  }

  // Obtener token
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  // Verificar si el usuario es admin usando el token
  isAdmin(): boolean {
    try {
      if (typeof window === 'undefined') return false;

      const token = localStorage.getItem('token');
      if (!token) return false;

      const decoded: any = jwtDecode(token);
      return decoded?.rol === '1';
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return false;
    }
  }


  // Verificar si el token está expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = (jwtDecode as any).default(token);
      const exp = decoded?.exp;
      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000); // segundos
      return exp < now;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return true;
    }
  }


  // Este método programa un logout cuando el token expire
  private scheduleTokenCheck() {
    const token = this.getToken();
    if (!token) return;

    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;

    if (timeLeft <= 0) {
      this.logout();
    } else {
      setTimeout(() => {
        this.logout();
      }, timeLeft * 1000); // en milisegundos
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);       // decodifica el JWT
      const now = Date.now() / 1000;             // tiempo actual en segundos
      return decoded.exp && decoded.exp > now;   // true si el token no ha expirado
    } catch {
      return false; // si hay error decodificando, el token no es válido
    }
  }
}
