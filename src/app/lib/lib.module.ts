import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {ListItemComponent} from './list/list-item/list-item.component';
import {NavComponent} from './nav/nav.component';
import {RouterModule} from "@angular/router";
import {NavButtonComponent} from './nav-button/nav-button.component';
import {ResizeableContainerComponent} from './resizeable-container/resizeable-container.component';
import {TooltipDirective} from "./tooltip/tooltip.directive";


@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    NavComponent,
    NavButtonComponent,
    ResizeableContainerComponent,
    TooltipDirective
  ],
  exports: [
    ResizeableContainerComponent,
    NavComponent,
    ListComponent,
    ListItemComponent,
    NavButtonComponent,
    TooltipDirective
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class LibModule {
}
