import {Component} from '@angular/core';
import {UserControllerService, UserDto} from "../../../auth-api";
import {NotificationService} from "../../notifications/notification.service";
import {BehaviorSubject, mergeMap} from "rxjs";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {

  private reloadUsers$ = new BehaviorSubject(null);
  users$ = this.reloadUsers$.pipe(mergeMap(() => this.userService.getUser()))

  constructor(private userService: UserControllerService, private notify: NotificationService) {
  }


  deleteUser(user: UserDto) {
    if (!user.id) {
      return this.notify.display({title: 'Error', text: 'No user id present', type: 'failure'})
    }
    this.userService.deleteUser(user.id).subscribe(() => {
      this.notify.display({title: 'User deleted', text: `Deleted user ${user.username}!`, type: 'success'});
      this.reloadUsers$.next(null);
    })
  }
}
