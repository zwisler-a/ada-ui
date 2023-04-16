import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {LogSocketService} from "./log-socket.service";
import {LogViewComponent} from './log-view/log-view.component';
import {OpenAPI} from "../../api";


const config: SocketIoConfig = {url: OpenAPI.BASE, options: {}};

@NgModule({
  declarations: [
    LogViewComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    CommonModule
  ],
  providers: [LogSocketService],
  exports: [LogViewComponent]
})
export class LogModule {

}
