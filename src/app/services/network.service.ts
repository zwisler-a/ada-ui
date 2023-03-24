import {Injectable} from "@angular/core";
import {map, mergeMap} from "rxjs/operators";
import {CoreService, NetworkDto} from "../../api";
import {NotificationService} from "../notifications/notification.service";
import {BehaviorSubject, shareReplay} from "rxjs";

@Injectable()
export class NetworkService {

  reloadNetworks$ = new BehaviorSubject(null);
  networks$ = this.reloadNetworks$.pipe(
    mergeMap(() => this.coreService.getAllNetworks()),
    shareReplay(1)
  )

  runningNetworks$ = this.networks$.pipe(map(networks => networks.filter(nw => nw.active)));
  stoppedNetworks$ = this.networks$.pipe(map(networks => networks.filter(nw => !nw.active)));

  constructor(private coreService: CoreService, private notify: NotificationService) {

  }


  startNetwork(network: NetworkDto) {
    this.coreService.startNetwork(network.identifier).subscribe(() => {
      this.notify.display({title: 'Network', text: `Network ${network.name} started!`, type: 'success'});
      this.reloadNetworks$.next(null);
    })
  }

  stopNetwork(network: NetworkDto) {
    this.coreService.stopNetwork(network.identifier).subscribe(() => {
      this.notify.display({title: 'Network', text: `Network ${network.name} stopped!`, type: 'success'});
      this.reloadNetworks$.next(null);
    })
  }
}
