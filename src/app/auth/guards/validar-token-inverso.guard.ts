import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenInversoGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean>  | boolean {
    return this.authService.verificaToken()
    .pipe(
      // Yes there are a JWT token
      tap( valid => {
        if ( valid ) {
          this.router.navigateByUrl('/home');
        }
      }),
      // There are not a token
      map( value => {
          return true;
      })
    );
  }
}
