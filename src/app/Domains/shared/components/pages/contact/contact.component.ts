import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'

})
export class ContactComponent {

  email = signal<string>('quimicosnuevaera@hotmail.com');
  tel = signal<string[]>(['3143497535','3106369148']);
  dir = signal<string>('Cra. 13 A #12-40, Bogotá');

}
