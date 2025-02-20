import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://localhost:8080/store';

  constructor(private http: HttpClient) {}

  getOwnerStore(ownerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-owner/${ownerId}`);
  }

  getUserIdByEmail(email: string) {
    return this.http.get<number>(`http://localhost:8080/user/id-by-email/${email}`);
  }
}
