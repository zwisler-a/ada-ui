import {Injectable} from "@angular/core";
import {
  BehaviorSubject, debounceTime,
  filter,
  firstValueFrom,
  mergeMap,
  Observable,
  OperatorFunction,
  shareReplay,
  take,
  tap
} from "rxjs";
import {
  CoreService,
  NetworkDto,
  NodeDefinitionDto,
  NodeInputInstanceDto,
  NodeInstanceDto,
  NodeOutputInstanceDto
} from "../../api";
import {map} from "rxjs/operators";
import {NetworkService} from "../services/network.service";
import {NotificationService} from "../notifications/notification.service";
import {uuidv4} from "./util/util";
import {Camera} from "./renderer/camera";
import {Logger} from "../log/logger";
import {Router} from "@angular/router";

@Injectable()
export class EditorService {
  private networkHistory: NetworkDto[] = [];
  private loadNetwork$ = new BehaviorSubject<string | null>(null);
  private updateNetwork$ = new BehaviorSubject<NetworkDto | null>(null);
  network$: Observable<NetworkDto> = this.loadNetwork$.pipe(
    filter(nw => !!nw) as OperatorFunction<string | null, string>,
    mergeMap(id => this.networkService.fetchNetwork(id)),
    tap(nw => this.networkHistory = [this.deepCopy(nw)]),
    filter(nw => !!nw) as OperatorFunction<NetworkDto | undefined, NetworkDto>,
    mergeMap((ldn) => this.updateNetwork$.pipe(map(updn => updn ? updn : ldn))),
    shareReplay(1)
  )
  camera$ = new BehaviorSubject(new Camera());

  constructor(
    private networkService: NetworkService,
    private coreService: CoreService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.updateNetwork$
      .pipe(debounceTime(1000))
      .subscribe(change => {
      if (change) this.networkHistory.push(this.deepCopy(change))
      if (this.networkHistory.length > 1000) {
        this.networkHistory.shift()
      }
    });
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

  undo() {
    const lastState = this.networkHistory[this.networkHistory.length - 2];
    if (lastState) {
      this.updateNetwork$.pipe(take(1)).subscribe(() => {
        this.networkHistory.pop();
        this.networkHistory.pop();
      })
      this.updateNetwork$.next(lastState);
      console.log(lastState)
    } else {
      Logger.log('No history to undo');
    }
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

  async deleteNode(toDelete: NodeInstanceDto) {
    const network = await firstValueFrom(this.network$);
    network.nodes = network.nodes.filter(node => node.identifier !== toDelete.identifier);
    [...toDelete.outputs ?? [], ...toDelete.inputs ?? []].forEach((element) => this.removeEdge(toDelete, element));
    this.updateNetwork$.next(network);
  }

  private deepCopy(obj: object) {
    return JSON.parse(JSON.stringify(obj));
  }

  async createEdge(outputNode: NodeInstanceDto, output: NodeOutputInstanceDto, inputNode: NodeInstanceDto, input: NodeInputInstanceDto) {
    const network = await firstValueFrom(this.network$);
    network.edges.push({
      identifier: uuidv4(),
      description: '',
      name: '',
      inputNodeIdentifier: inputNode.identifier,
      outputNodeIdentifier: outputNode.identifier,
      inputIdentifier: input.identifier,
      outputIdentifier: output.identifier,
    });
    this.updateNetwork$.next(network);
  }

  async removeEdge(node: NodeInstanceDto, element: NodeInstanceDto | NodeOutputInstanceDto) {
    const network = await firstValueFrom(this.network$);
    network.edges = network.edges.filter(
      (edge) =>
        !(
          (node.identifier === edge.inputNodeIdentifier ||
            node.identifier === edge.outputNodeIdentifier) &&
          (edge.inputIdentifier === element.identifier ||
            edge.outputIdentifier === element.identifier)
        ),
    );
    this.updateNetwork$.next(network);
  }

  async openDetails(node: NodeInstanceDto) {
    const network = await firstValueFrom(this.network$);
    await this.router.navigate(['/editor', network.identifier, 'node', node.identifier])
  }
}
