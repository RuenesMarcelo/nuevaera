import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../models/product';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  constructor(public authService: AuthService) {}

  
  
  @ViewChild('productModal', { static: false }) productModal!: ElementRef;
  selectedProduct: any;

  openProductModal(product: any) {
    this.selectedProduct = product;

    const modalElement = this.productModal.nativeElement;
    const modalInstance = new bootstrap.Modal(modalElement);

    modalInstance.show();
  }

  editProduct(){
    console.log("localStorage.getItem('token')");
  }
  
  @Input({required: true}) product!: Product;
}
