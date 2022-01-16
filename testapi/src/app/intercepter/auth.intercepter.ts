import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { config, Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
    HttpHeaderResponse |
    HttpProgressEvent |
    HttpResponse<any> |
    HttpUserEvent<any>> {

  
    let token = localStorage.getItem('token');
    
    const copiedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(copiedReq);

    // return next.handle(req);
  }
}