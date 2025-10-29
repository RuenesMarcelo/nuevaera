import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../models/product';

declare const bootstrap: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  
  
  @ViewChild('productModal', { static: false }) productModal!: ElementRef;
  selectedProduct: any;

  openProductModal(product: any) {
    this.selectedProduct = product;

    const modalElement = this.productModal.nativeElement;
    const modalInstance = new bootstrap.Modal(modalElement);

    modalInstance.show();
  }
  
  @Input({required: true}) product!: Product;
}
