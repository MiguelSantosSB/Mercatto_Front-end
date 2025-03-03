import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();
    
    if (this.authService.isLoggedIn() && requiredRoles.includes(userRole)) {
      return true;
    }
    
    this.router.navigate(['/']);
    return false;
  }
}
