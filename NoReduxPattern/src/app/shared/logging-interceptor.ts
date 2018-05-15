import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable} from "rxjs/Observable";
// import { do }  from "rxjs/add/operator";

export class LoggingInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        .do(event => {
           console.log('LoggingInterceptor ', event);
        });
    }
}