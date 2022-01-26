import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarLeftComponent } from './shared/sidebar-left/sidebar-left.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    MessagesComponent,
    HeaderComponent,
    HomeComponent,
    SidebarLeftComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
