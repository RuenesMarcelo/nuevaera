import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service_info, services_info } from '../../../info/service_info';

@Component({
  selector: 'app-card-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css'
})
export class CardServiceComponent {
  servicios: { [key: string]: Service_info } = services_info;
  objectKeys = Object.keys;

}
