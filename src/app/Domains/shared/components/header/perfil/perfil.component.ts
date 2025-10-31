import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

    toggleDropdown(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const toggle = event.currentTarget as HTMLElement;
    const parent = toggle.parentElement; // <li>
    const dropdown = parent?.nextElementSibling as HTMLElement;

    parent?.classList.toggle('active');
    dropdown?.classList.toggle('dropdown-active');
  }

}
