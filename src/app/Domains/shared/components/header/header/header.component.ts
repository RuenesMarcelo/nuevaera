import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  

  
  categories= signal<Category[]>([]);
  products = signal<Product[]>([]);
  private CategoriesService = inject(CategoriesService);
  private ProductService = inject(ProductService);

  ngOnInit(): void {    
    this.getCategories();

    
  }

  constructor(public authService: AuthService) {
  }

  private getCategories(){
    this.CategoriesService.getAll()
    .subscribe({
      next: (data) =>{
        this.categories.set(data);
      },
      error: () =>{
        
      }
    })
  }


}
