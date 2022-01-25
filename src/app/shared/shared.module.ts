import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ChatComponent } from './chat/chat.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    ChatComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
