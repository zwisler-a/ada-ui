import {Component} from '@angular/core';
import {EditorService} from "../editor.service";
import {ActivatedRoute} from "@angular/router";
import {NodeInstanceDto} from "../../../api";
import {combineLatestWith} from "rxjs";

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent {

  node?: NodeInstanceDto;

  constructor(private editorService: EditorService, private activeRouter: ActivatedRoute) {
    this.editorService.network$.pipe(
      combineLatestWith(this.activeRouter.params)
    ).subscribe(([network, {id}]) => {
      this.node = network.nodes.find(node => node.identifier === id);
    })
  }


}
