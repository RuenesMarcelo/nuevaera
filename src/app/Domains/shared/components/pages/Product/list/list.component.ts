import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { ProductService } from '../../../../services/product.service';
import { CategoriesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent,],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productService = inject(ProductService);
  private categoryService = inject(CategoriesService);


  
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  private getProducts() {
    this.productService.getAll()
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: () => {

        }
      })
  }

  private getCategories() {
    this.categoryService.getAll()
      .subscribe({
        next: (categories) => {
          this.categories.set(categories);
        },
        error: () => {
        }
      });
  }
}
