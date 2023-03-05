import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OAuthModule} from "angular-oauth2-oidc";
import {HttpClientModule} from "@angular/common/http";
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditorComponent,
    AvailableNodesComponent,
    NodePreviewComponent,
    NavigationComponent,
    NetworkDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {
        path: 'editor/:id', component: EditorComponent,
        children: [
          {path: 'available-nodes', component: AvailableNodesComponent},
          {path: 'details', component: NetworkDetailsComponent}
        ]
      },
    ]),
    NotificationsModule
  ],
  providers: [
    CoreService,
    NetworkService,
    EditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
