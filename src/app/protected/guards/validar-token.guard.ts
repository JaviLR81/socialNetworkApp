import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.verificaToken()
    .pipe(
      // Disparando un efecto secundario no cambia el contenido
      tap( valid => {
        if ( !valid ) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.verificaToken()
    .pipe(
      // Disparando un efecto secundario no cambia el contenido
      tap( valid => {
        if ( !valid ) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
