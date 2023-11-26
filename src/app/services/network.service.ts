import {Injectable} from "@angular/core";
import {mergeMap} from "rxjs/operators";
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

  constructor(private coreService: CoreService, private notify: NotificationService) {

  }


  startNetwork(network: NetworkDto) {
    return new Promise<void>(res => {
      this.coreService.startNetwork(network.identifier).subscribe(() => {
        this.notify.display({title: 'Network', text: `Network ${network.name} started!`, type: 'success'});
        this.reloadNetworks$.next(null);
        res();
      })
    })

  }

  stopNetwork(network: NetworkDto) {
    return new Promise<void>(res => {
      this.coreService.stopNetwork(network.identifier).subscribe(() => {
        this.notify.display({title: 'Network', text: `Network ${network.name} stopped!`, type: 'success'});
        this.reloadNetworks$.next(null);
        res();
      })
    })

  }

  fetchNetwork(id: string) {
    return this.coreService.getNetwork(id);
  }
}
