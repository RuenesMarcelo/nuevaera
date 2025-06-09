import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

}
