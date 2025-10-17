import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  correo: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }


  onSubmit(): void {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (auth: Auth) => {
        // Aquí podrías guardar el user en el localStorage o un authService
        console.log('Usuario autenticado:', auth);
        this.router.navigate(['/']); // Cambia por la ruta que desees
        alert('¡Bienvenido! Has iniciado sesión con éxito.');
      },
      error: (err) => {
        console.error(err);
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("password") as HTMLInputElement).value = "";
      }
    });
  }

}
