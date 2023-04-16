import {Component} from '@angular/core';
import {EditorService} from "../editor.service";
import {firstValueFrom} from "rxjs";
import {NetworkService} from "../../services/network.service";

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.css']
})
export class NetworkDetailsComponent {

  network$ = this.editorService.network$;

  constructor(private editorService: EditorService, private networkService: NetworkService) {

  }


  async saveNetwork() {
    await this.editorService.saveNetwork();
  }

  async startNetwork() {
    const network = await firstValueFrom(this.editorService.network$);
    await this.networkService.startNetwork(network);
    this.editorService.loadNetwork(network.identifier);
  }

  async stopNetwork() {
    const network = await firstValueFrom(this.editorService.network$);
    await this.networkService.stopNetwork(network);
    this.editorService.loadNetwork(network.identifier);
  }

}
