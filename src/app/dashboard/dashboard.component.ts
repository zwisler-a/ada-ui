import {Component} from '@angular/core';
import {CoreService, NetworkDto} from "../../api";
import {NetworkService} from "../services/network.service";
import {uuidv4} from "../editor/util/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  networks$ = this.networkService.networks$;

  constructor(private networkService: NetworkService, private coreService: CoreService, private router: Router) {

  }

  startNetwork(network: NetworkDto) {
    this.networkService.startNetwork(network);
  }

  stopNetwork(network: NetworkDto) {
    this.networkService.stopNetwork(network);
  }

  createNewNetwork() {
    const created = uuidv4();
    this.coreService.saveNetwork({
      identifier: created,
      name: 'New Network',
      description: '',
      nodes: [],
      edges: [],
      active: false
    }).subscribe(() => {
        this.networkService.reloadNetworks$.next(null)
        this.router.navigate(['/editor', created])
      }
    );
  }
}
