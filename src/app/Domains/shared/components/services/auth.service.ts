// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; // ajusta si es necesario

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<Auth> {
    return this.http.post<User>(this.apiUrl, { correo, contrasena });
    
  }
}
