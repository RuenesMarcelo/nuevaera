import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardServiceComponent } from '../shared/components/pages/card-service/card-service.component';
import { ContactComponent } from "../shared/components/pages/contact/contact.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, CardServiceComponent, ContactComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {

}
