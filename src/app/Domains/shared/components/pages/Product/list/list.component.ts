import { Component, computed, inject, Input, signal, SimpleChanges } from '@angular/core';
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
  categoryName = signal<String>("Todos los productos");
  searchTerm = ''; // 🟢 texto de búsqueda


  // ✅ PAGINACIÓN
  page = signal<number>(1);
  pageSize = 28;



  constructor(public authService: AuthService) { }


  ngOnInit(): void {

    // 👇 aquí escuchamos los cambios del parámetro categoria
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoria'];
      if (categoryId) {
        this.getProductsByCategory(categoryId);
      } else {
        this.getAllProducts();
        this.categoryName.set('Todos los Productos');
      }
    });
  }

  // ✅ getter para obtener productos paginados
  paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  // ✅ total páginas
  totalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.pageSize);
  });
  
  goToPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;

    this.page.set(p);

    // 🔥 Subir automáticamente al inicio de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // animación suave
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
    this.categoryService.getById(parseInt(categoryId, 10)).subscribe({
      next: (categories) => {
        this.categoryName.set(categories.nombre);
      }
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

    if (term) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(term)
      );
    }

    this.filteredProducts.set(filtered);

    // ✅ volver a página 1 cuando cambia filtro
    this.page.set(1);
  }


  //paginación 

  visiblePages(): number[] {
  const current = this.page();          // página actual
  const total = this.totalPages();      // total de páginas
  const pages: number[] = [];

  // inicio = página actual
  let start = current;

  // si estoy en las primeras páginas, arranco desde 1
  if (current <= 2) {
    start = 1;
  }
  // si estoy en las últimas páginas, ajusto para que no se pase
  else if (current >= total - 1) {
    start = total - 2;
  }

  // agrego hasta 3 páginas
  for (let i = start; i <= Math.min(start + 2, total); i++) {
    pages.push(i);
  }

  return pages;
}



}
