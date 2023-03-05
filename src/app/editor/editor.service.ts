import {Injectable} from "@angular/core";
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  mergeMap,
  Observable,
  OperatorFunction,
  shareReplay,
  Subject
} from "rxjs";
import {CoreService, NetworkDto, NodeDefinitionDto} from "../../api";
import {map} from "rxjs/operators";
import {NetworkService} from "../services/network.service";
import {NotificationService} from "../notifications/notification.service";
import {uuidv4} from "./util/util";
import {Camera} from "./renderer/camera";

@Injectable()
export class EditorService {
  private loadNetwork$ = new Subject<String>();
  private updateNetwork$ = new BehaviorSubject<NetworkDto | null>(null);
  network$: Observable<NetworkDto> = this.loadNetwork$.pipe(
    mergeMap(id => this.networkService.networks$.pipe(
      map(networks => networks.find(network => network.identifier === id)),
    )),
    filter(nw => !!nw) as OperatorFunction<NetworkDto | undefined, NetworkDto>,
    mergeMap((ldn) => this.updateNetwork$.pipe(map(updn => updn ? updn : ldn))),
    shareReplay(1)
  )
  camera$ = new BehaviorSubject(new Camera());

  constructor(private networkService: NetworkService, private coreService: CoreService, private notify: NotificationService) {
  }

  updateCamera(camera: Camera) {
    this.camera$.next(camera);
  }

  loadNetwork(networkId: string) {
    this.loadNetwork$.next(networkId);
  }

  async saveNetwork() {
    const network = await firstValueFrom(this.network$);
    this.coreService.saveNetwork(network).subscribe(() => {
      this.notify.display({title: 'Network', text: 'Network was saved!', type: 'success'})
    })
  }

  async addNode(node: NodeDefinitionDto) {
    const network = await firstValueFrom(this.network$);
    network.nodes.push({
      identifier: uuidv4(),
      name: node.name,
      description: node.description,
      definitionId: node.identifier,
      inputs: node.inputs.map(a => ({...a, definition: a})),
      outputs: node.outputs.map(a => ({...a, definition: a})),
      attributes: node.attributes.map(a => ({...a, definitionId: a.identifier, value: ''})),
      x: 400,
      y: 400
    });
    this.updateNetwork$.next(network);
  }

  updateNetwork(network: NetworkDto) {
    this.updateNetwork$.next(network);
  }
}
