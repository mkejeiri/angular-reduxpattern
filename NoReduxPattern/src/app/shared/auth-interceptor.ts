import { HttpInterceptor, 
         HttpEvent, 
         HttpHandler,
         HttpRequest, 
         HttpParams,
         HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        //const request = req.clone({headers: req.headers.append('','')}); //this will add to the headers
        // new HttpHeaders().set('Content-Type','application/json')
        //new HttpParams().set('auth', token)
        // const token = this.authService.getToken();  
        
        console.log('AuthInterceptor',req);
        return next.handle(req.clone({
                headers:new HttpHeaders().set('Content-Type','application/json'),
                // params:new HttpParams().set('auth', token) //OR
                params: req.params.append('auth',this.authService.getToken())
                }
            )
        );
    }
    constructor(private authService:AuthService){}

}