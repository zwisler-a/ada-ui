import {Component} from '@angular/core';
import {NetworkDto} from "../../api";
import {NetworkService} from "../services/network.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  runningNetworks$ = this.networkService.runningNetworks$;
  stoppedNetworks$ = this.networkService.stoppedNetworks$;

  constructor(private networkService: NetworkService) {

  }

  startNetwork(network: NetworkDto) {
    this.networkService.startNetwork(network);
  }

  stopNetwork(network: NetworkDto) {
    this.networkService.stopNetwork(network);
  }
}
