import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{   
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      this.router.navigate(['/signin']);
      return this.authService.isAuthenticated();
    } 
  }
}
