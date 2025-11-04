import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../models/product';
import { AuthService } from '../../../../services/auth.service';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RouterLink } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(public authService: AuthService, private router: Router, public productservice: ProductService) { }



  @ViewChild('productModal', { static: false }) productModal!: ElementRef;
  selectedProduct: any;

  openProductModal(product: any) {
    this.selectedProduct = product;
    
    const modalElement = this.productModal.nativeElement;
    const modalInstance = new bootstrap.Modal(modalElement);

    modalInstance.show();
  }

  eliminarProducto() {
  if (!this.product.id_producto) return;

  const confirmar = confirm('¿Seguro que deseas eliminar este producto?');
  if (!confirmar) return;

  this.productservice.delete(this.product.id_producto).subscribe({
    next: () => {
      alert('Producto eliminado correctamente');

      // 👇 Cierra el modal con animación
      const modalElement = this.productModal.nativeElement;
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      
      if (modalInstance) {
        modalInstance.hide(); // esto dispara el fade-out del modal de Bootstrap
      }

      // Limpia el producto seleccionado (opcional)
      this.selectedProduct = null;

      // 👇 Navega a la lista después de un breve delay (espera la animación)
      setTimeout(() => {
        this.router.navigate(['/list']);
      }, 400); // 400 ms = coincide con la duración del fade-out
    },
    error: (err) => {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar producto');
    }
  });
}



  @Input({ required: true }) product!: Product;
}
