import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiUrl = 'http://localhost:8081/api/product'; // ajusta si es necesario

  itsautenticated = signal<boolean>(false);



  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id_producto: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id_producto}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id_producto: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id_producto}`, product);
  }

  delete(id_producto: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_producto}`);
  }




}
