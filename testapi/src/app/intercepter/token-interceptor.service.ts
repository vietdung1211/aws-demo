import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenInterceptorService implements HttpInterceptor{

//   constructor( private injector: Injector) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler) :Observable<HttpEvent<any>> {
//     console.log("aaaaaa");
    
//     // const token = localStorage.getItem('token');
//     const token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
//     const tokenizedReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       }
//     })    

//     return next.handle(tokenizedReq)
//   }
// }

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token = "";
 

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const authHeader = { Authorization: "Basic " + this.token };
    const authReq = req.clone({ setHeaders: authHeader });
    return next.handle(authReq);
  }
}