import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) {}

  getProductsByStore(storeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/store/${storeId}`);
  }

  delete(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }

  create(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, productData);
  }

}
