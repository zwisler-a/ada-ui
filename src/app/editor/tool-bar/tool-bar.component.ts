import {Component, Input} from '@angular/core';
import {MasterTool} from "../tools/master.tool";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {

  tools: {
    name: string,
    icon: string,
    tooltip: string
  }[] = [
    {name: 'Cursor', icon: 'left_click', tooltip: 'Cursor'},
    {name: 'details', icon: 'info', tooltip: 'Inspect Node'},
    {name: 'connect', icon: 'link', tooltip: 'Connect Node'},
    {name: 'delete', icon: 'delete', tooltip: 'Delete Node'},
    {name: 'delete-edge', icon: 'delete_sweep', tooltip: 'Delete Edge'},
  ]

  @Input()
  masterTool!: MasterTool;


  selectTool(toolName: string) {
    this.masterTool?.select(toolName);
  }

  isActive(tool: string) {
    return this.masterTool?.toolIsActive(tool) ?? false;
  }
}
