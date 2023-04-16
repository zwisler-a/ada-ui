import {Socket} from "ngx-socket-io";
import {Injectable} from "@angular/core";

@Injectable()
export class LogSocketService extends Socket {
  constructor() {
    super({ url: '/log', options: {} });
  }
}
