import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'https://back-nuevaera-productos.onrender.com/api/categoria';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id_categoria: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id_categoria}`);
  }

  create(category: Category): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, category);
  }

  update(id_categoria: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id_categoria}`, category);
  }

  delete(id_categoria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_categoria}`);
  }




}

