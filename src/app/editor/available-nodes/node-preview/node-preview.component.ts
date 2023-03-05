import {Component, Input} from '@angular/core';
import {NodeDefinitionDto} from "../../../../api";

@Component({
  selector: 'app-node-preview',
  templateUrl: './node-preview.component.html',
  styleUrls: ['./node-preview.component.css']
})
export class NodePreviewComponent {
  @Input()
  definition!: NodeDefinitionDto;
}
