import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { ProductService } from '../../../../services/product.service';
import { CategoriesService } from '../../../../services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {


  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoriesService);
  filteredProducts = signal<Product[]>([]);
  searchTerm = ''; // 🟢 texto de búsqueda

  
  constructor(public authService: AuthService) {}


  ngOnInit(): void {

    // 👇 aquí escuchamos los cambios del parámetro category_id
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category_id'];
      if (categoryId) {
        this.getProductsByCategory(categoryId);
      } else {
        this.getAllProducts();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {


  }


  private getProductsByCategory(categoryId: string) {
  this.productService.getProductsByCategory(categoryId).subscribe({
    next: (products) => {
      this.products.set(products);
      this.applyFilters(); // 🟢 Aplica el filtro al cargar productos
    },
    error: (err) => console.error(err)
  });
}

  private getAllProducts() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.applyFilters(); // 🟢 Aplica el filtro al cargar productos
      },
      error: (err) => console.error(err)
    });
  }

  onSearchChange() {
    this.applyFilters();
  }


  private applyFilters() {
    const term = this.searchTerm.toLowerCase().trim();

    let filtered = this.products();

    // Si hay texto, filtramos por nombre
    if (term) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(term)
      );
    }

    this.filteredProducts.set(filtered);
    }
}
