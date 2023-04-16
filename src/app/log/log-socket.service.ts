import {Socket} from "ngx-socket-io";
import {Injectable} from "@angular/core";
import {OpenAPI} from "../../api";

@Injectable()
export class LogSocketService extends Socket {
  constructor() {
    super({url: OpenAPI.BASE + '/log', options: {}});
  }
}
