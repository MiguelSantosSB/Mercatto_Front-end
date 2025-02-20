import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return '';
  }

  loginOwner(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  register(name: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:8080/user/create`, {
      name,
      email,
      phone,
      password,
      role: 'USER'
    });
  }

  registerOwner(name: string, email: string, phone: string, cpf: string, rg: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:8080/user/create`, {
      name,
      email,
      phone,
      cpf,
      rg,
      password,
      role: 'OWNER'
    });
  }
}
