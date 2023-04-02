import {Component} from '@angular/core';
import {UserControllerService} from "../../../auth-api";
import {NotificationService} from "../../notifications/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent {

  constructor(
    private userService: UserControllerService,
    private notify: NotificationService,
    private router: Router) {
  }


  createUser($event: SubmitEvent) {
    $event.preventDefault();
    const data = new FormData($event.target as any);
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    if (!username) return;
    if (!password) return;
    this.userService.createUser({
      username,
      password,
      permissions: []
    }).subscribe(() => {
      this.notify.display({title: 'Created user', text: `Created user ${username}`, type: 'success'});
      this.router.navigate(['/user']).then();
    })
  }
}
