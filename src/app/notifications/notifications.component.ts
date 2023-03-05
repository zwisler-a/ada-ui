import { Component } from '@angular/core';
import {NotificationService} from "./notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {
  }
}
