import {Component} from '@angular/core';
import {CoreService, NodeDefinitionDto} from "../../../api";
import {EditorService} from "../editor.service";
import {BehaviorSubject, mergeMap} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-available-nodes',
  templateUrl: './available-nodes.component.html',
  styleUrls: ['./available-nodes.component.css']
})
export class AvailableNodesComponent {

  private filter$ = new BehaviorSubject("");

  set filter(val: string) {
    this.filter$.next(val);
  }

  get filter() {
    return this.filter$.value;
  }

  nodes$ = this.coreService.getAvailableNodes().pipe(
    mergeMap(nodes => this.filter$.pipe(
      map(filter => nodes.filter(node => JSON.stringify(node).includes(filter)))
    ))
  );

  constructor(private coreService: CoreService, private editorService: EditorService) {
  }

  async addNode(node: NodeDefinitionDto) {
    await this.editorService.addNode(node);
  }
}
