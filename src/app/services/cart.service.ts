import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
}

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

interface OrderRequest {
  paymentMethod: string;
  shippingAddress: string;
}

interface OrderResponse {
  orderId: number;
  status: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/carts';

  constructor(private http: HttpClient) {}

  addItem(request: CartRequest): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.baseUrl}/add`, request);
  }

  getCart(userId: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}?userId=${userId}`);
  }

  removeItem(productId: number, request: CartRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/remove?productId=${productId}`, request);
  }

  checkout(userId: number, request: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.baseUrl}/checkout?userId=${userId}`, request);
  }
}
