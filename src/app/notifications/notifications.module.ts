import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './notifications.component';
import {NotificationComponent} from './notification/notification.component';
import {NotificationService} from "./notification.service";


@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [NotificationService],
  exports: [NotificationsComponent]
})
export class NotificationsModule {
}
