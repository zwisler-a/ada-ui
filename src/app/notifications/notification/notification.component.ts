import {Component, Input} from '@angular/core';
import {Notification} from "../notification.interface";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input()
  notification!: Notification;
}
