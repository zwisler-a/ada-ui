import { Component } from '@angular/core';
import {CoreService, NodeDefinitionDto} from "../../../api";
import {EditorService} from "../editor.service";

@Component({
  selector: 'app-available-nodes',
  templateUrl: './available-nodes.component.html',
  styleUrls: ['./available-nodes.component.css']
})
export class AvailableNodesComponent {

  nodes$ = this.coreService.getAvailableNodes();
  constructor(private coreService: CoreService, private editorService: EditorService) {
  }

  addNode(node: NodeDefinitionDto) {
    this.editorService.addNode(node);
  }
}
