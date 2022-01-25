import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenInversoGuard } from './auth/guards/validar-token-inverso.guard';
import { ValidarTokenGuard } from './protected/guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule ),
    canActivate: [ValidarTokenInversoGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule ),
    canLoad: [ValidarTokenGuard],
    canActivate: [ValidarTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
