// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; // ajusta si es necesario

  itsautenticated = signal<boolean>(false);


  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<Auth> {
     return this.http.post<Auth>(this.apiUrl, { correo, contrasena }).pipe(
      tap(() => this.itsautenticated.set(true)) 
    );
  }

  logout() {
    this.itsautenticated.set(false); 
  }
}
