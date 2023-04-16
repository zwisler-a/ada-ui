import {Component, HostListener} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "./auth.config";
import {NotificationService} from "./notifications/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authenticated = false;
  showConsole = false;

  constructor(
    private oauthService: OAuthService,
    private notify: NotificationService
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.oauthService.setupAutomaticSilentRefresh();
    }).then(() => {
      this.notify.display({title: 'Authentication', type: 'success', text: 'Authentication successful'});
      this.authenticated = true;
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  toggleShowConsole() {
    this.showConsole = !this.showConsole;
  }

}
