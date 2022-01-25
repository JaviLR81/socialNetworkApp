import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children : [
      { path:'dashboard' , component:DashboardComponent },
      { path:'messages'  , component: MessagesComponent },
      { path:'profile'   , component: ProfileComponent },
      { path:'**'        , redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
