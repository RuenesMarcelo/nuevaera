import { Component, HostListener, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { PerfilComponent } from "../perfil/perfil.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, PerfilComponent,],
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
  dropdownPerfilOpen = false;


  constructor(public authService: AuthService, private router: Router) {
    // cerrar dropdown al cambiar de ruta
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.dropdownPerfilOpen = false;
      }
    });
  }

  // llamado desde el botón "Cerrar sesión"
  handleLogout(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // 1) cerrar la sesión en el servicio (limpia localStorage y signal)
    this.authService.logout();

    // 2) cerrar el dropdown si estaba abierto
    this.dropdownPerfilOpen = false;

    // 3) redirigir al login
    this.router.navigate(['/']);

    // 4) opcional: mostrar mensaje breve (puedes cambiar por un toast)
    alert('Sesión cerrada');
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

  logout(): void {
    this.authService.logout();
  }
}
