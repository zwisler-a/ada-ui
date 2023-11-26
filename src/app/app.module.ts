import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OAuthModule} from "angular-oauth2-oidc";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {CoreService} from "../api";
import {NotificationsModule} from "./notifications/notifications.module";
import {NetworkService} from "./services/network.service";
import {EditorComponent} from './editor/editor.component';
import {AvailableNodesComponent} from './editor/available-nodes/available-nodes.component';
import {NodePreviewComponent} from './editor/available-nodes/node-preview/node-preview.component';
import {NavigationComponent} from './editor/navigation/navigation.component';
import {NetworkDetailsComponent} from './editor/network-details/network-details.component';
import {EditorService} from "./editor/editor.service";
import {ErrorInterceptor} from "./services/error.interceptor";
import {LibModule} from "./lib/lib.module";
import {NodeDetailsComponent} from './editor/node-details/node-details.component';
import {NavComponent} from "./lib/nav/nav.component";
import {FormsModule} from "@angular/forms";
import {LogModule} from "./log/log.module";
import { ToolBarComponent } from './editor/tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditorComponent,
    AvailableNodesComponent,
    NodePreviewComponent,
    NavigationComponent,
    NetworkDetailsComponent,
    NodeDetailsComponent,
    ToolBarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    RouterModule.forRoot([
      {
        path: 'editor/:id', component: EditorComponent,
        children: [
          {path: 'available-nodes', component: AvailableNodesComponent},
          {path: 'details', component: NetworkDetailsComponent},
          {path: 'node/:id', component: NodeDetailsComponent}
        ]
      },
      {
        path: '', component: NavComponent, children: [
          {path: '', component: DashboardComponent},
          {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
        ]
      },
    ]),
    NotificationsModule,
    LogModule,
    LibModule
  ],
  providers: [
    CoreService,
    NetworkService,
    EditorService,
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
