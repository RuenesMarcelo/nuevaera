import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { ProductServiceService } from '../../../../services/product.service';
import { CategoriesServicesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent,],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  
  products = signal<Product[]>([]);
  categories= signal<Category[]>([]);
  private productService = inject(ProductServiceService);
  private categoryService = inject(CategoriesServicesService);

  ngOnInit(): void {
    this.getProducts();
    
  }

  

  private getProducts(){
    this.productService.getAll()
    .subscribe({
      next: (products) =>{
        this.products.set(products);
      },
      error: () =>{
        
      }
    })
  }

}
