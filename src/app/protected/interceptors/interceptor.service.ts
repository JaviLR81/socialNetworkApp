import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log('Paso por el interceptor');

    const headers = new HttpHeaders({
      'token': 'ABCD123'
    });

    // It should be clone
    const reqClone = req.clone({
      headers
    });


    return next.handle(reqClone)
      .pipe(
          tap( () => {
            console.log('Soy un efecto secundario');
            console.log('Aquí podria ser manejado el error con el operador throwError :)');
          })
      );
  }
}
