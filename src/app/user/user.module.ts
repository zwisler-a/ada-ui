import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersPageComponent} from './users-page/users-page.component';
import {LibModule} from "../lib/lib.module";
import {RouterModule} from "@angular/router";
import {UserControllerService} from "../../auth-api";
import {SaveUserComponent} from './save-user/save-user.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    SaveUserComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: UsersPageComponent},
      {path: 'save', component: SaveUserComponent}
    ]),
    CommonModule,
    LibModule
  ],
  providers: [UserControllerService]
})
export class UserModule {
}
