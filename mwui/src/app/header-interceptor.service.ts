import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let accessToken = localStorage.getItem("accessToken");
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    
    if(accessToken!=undefined){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + accessToken)});
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error ? error.error : '',
          status: error && error.status ? error.status : '',
          statusText: error && error.statusText ? error.statusText : '',
          message: error && error.message ? error.message : ''
        };
        return throwError(data);
      }));
    // return next.handle(request);
  }
}
