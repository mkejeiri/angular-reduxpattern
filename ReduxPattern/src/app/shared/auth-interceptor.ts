import { HttpInterceptor, 
         HttpEvent, 
         HttpHandler,
         HttpRequest, 
         HttpParams,
         HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAppStore from '../store/app.reducers';
import 'rxjs/operator/switchMap';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        //const request = req.clone({headers: req.headers.append('','')}); //this will add to the headers
        // new HttpHeaders().set('Content-Type','application/json')
        //new HttpParams().set('auth', token)
        // const token = this.authService.getToken();  
        
        console.log('AuthInterceptor',req);


        return this.store.select('auth')
        /**
         * store.select sets up ongoing subscription to our store; i.e. whenever we change the APP state
         * it will fire and we will exact the token and send the request, hence the use of take operator
         * which means only get this value once!!!.
         */
        .take(1)
        /**        
         * using map will wrap the 'next.handle' in a new observable, but 'next.handle' is already an observable, 
         * we should avoid this wrapping operation by relying on switchMap (instead of map operator) which return the 
         *  'next.handle' original observable.
         */
        .switchMap((authState) => 
                   {
                    const token = authState.token;
                    return  next.handle(req.clone({
                            headers:new HttpHeaders().set('Content-Type','application/json'),
                            params: req.params.append('auth',token)
                        }));
                   }
            );
    }

    constructor(private store:Store<fromAppStore.AppState>){}
}