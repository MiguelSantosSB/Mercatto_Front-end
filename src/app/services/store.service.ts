import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://localhost:8080/store';

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getOwnerStore(ownerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-owner/${ownerId}`);
  }

  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/user/id-by-email/${email}`);
  }

  findById(storeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${storeId}`);
  }

  getAddressDetails(addressId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/address/${addressId}`);
  }
}
