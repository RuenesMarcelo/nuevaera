import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardServiceComponent } from '../shared/components/pages/card-service/card-service.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, CardServiceComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {

}
