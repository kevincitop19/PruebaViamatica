import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/categoria';
import { Product } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

   private apiUrl = 'https://localhost:7275/api/Category'; // Cambia esto según sea necesario

  constructor(private http: HttpClient) { }

  public getListCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  public getByType(idCategoria: number): Observable<Product[]> {
    return this.http.get<Product[]>(`https://localhost:7275/api/Product?idCategoria=${idCategoria}`);
  }
  }

