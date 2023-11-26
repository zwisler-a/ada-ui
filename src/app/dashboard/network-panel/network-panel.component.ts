import {Component, Input} from '@angular/core';
import {NetworkDto} from "../../../api";
import {NetworkService} from "../../services/network.service";

@Component({
  selector: 'app-network-panel',
  templateUrl: './network-panel.component.html',
  styleUrls: ['./network-panel.component.css']
})
export class NetworkPanelComponent {

  @Input()
  network!: NetworkDto

  constructor(private networkService: NetworkService) {

  }


  start(network:NetworkDto) {
    this.networkService.startNetwork(network);
  }

  stop(network:NetworkDto) {
    this.networkService.stopNetwork(network);
  }

}
