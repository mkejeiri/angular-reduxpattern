import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable} from "rxjs/Observable";
import  "rxjs/add/operator/do";
import  "rxjs/add/operator/take";

export class LoggingInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        // .take(1)
        .do(event => {
           console.log('LoggingInterceptor ', event);
        });
    }
}
