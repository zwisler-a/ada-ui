import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Notification} from "./notification.interface";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() {
  }

  display(notification: Notification) {
    this.notifications$.next([notification, ...this.notifications$.value]);
    setTimeout(() => {
      this.notifications$.next(this.notifications$.value.filter(n => n !== notification));
    }, notification.duration ?? 2000);
  }
}
