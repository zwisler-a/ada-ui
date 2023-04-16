import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {LogSocketService} from "./log-socket.service";
import {LogViewComponent} from './log-view/log-view.component';


const config: SocketIoConfig = {url: window.origin, options: {}};

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
