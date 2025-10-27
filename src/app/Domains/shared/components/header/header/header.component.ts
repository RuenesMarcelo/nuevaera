import { Component, HostListener, inject, Input, signal } from '@angular/core';
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


  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  private CategoriesService = inject(CategoriesService);
  private ProductService = inject(ProductService);
  isMobileNavOpen = signal(false);
  showScrollTop = signal(false);


  constructor(public authService: AuthService) {
  }



  ngOnInit(): void {
    this.getCategories();


  }

  toggleMobileNav() {
    this.isMobileNavOpen.update(value => !value);
    document.body.classList.toggle('mobile-nav-active', this.isMobileNavOpen());
  }

  closeMobileNavOnLink(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && this.isMobileNavOpen()) {
      this.toggleMobileNav();
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const toggle = event.currentTarget as HTMLElement;
    const parent = toggle.parentElement; // <li>
    const dropdown = parent?.nextElementSibling as HTMLElement;

    parent?.classList.toggle('active');
    dropdown?.classList.toggle('dropdown-active');
  }


  private getCategories() {
    this.CategoriesService.getAll()
      .subscribe({
        next: (data) => {
          this.categories.set(data);
        },
        error: () => {

        }
      })
  }





}
