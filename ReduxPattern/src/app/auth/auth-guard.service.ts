import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import 'rxjs/add/operator/take';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store:Store<fromApp.AppState>, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{   
    return this.store.select('auth')
    /**
     * to make sure that we take one element/request per guard activation,
     * we have to do it for the httpInterceptor too, otherwise this will run infinitely.
     * 
     */
    .take(1)
    .map(
      (authState) =>{      
        if (!authState.authenticated) {
          this.router.navigate(['/signin']);
        }        
        return authState.authenticated;
      }
    );
  }
}
