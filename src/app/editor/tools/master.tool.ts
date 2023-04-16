import {Tool} from "./tool";
import {EditorService} from "../editor.service";
import {MoveViewTool} from "./move-view.tool";
import {DraggingNodeTool} from "./dragging-node.tool";
import {DeleteTool} from "./delete.tool";
import {ConnectTool} from "./connect.tool";
import {DetailsTool} from "./details.tool";
import {EdgeDeleteTool} from "./edge-delete.tool";

export class MasterTool extends Tool {
  tools: Tool[] = [];

  constructor(canvas: HTMLCanvasElement, editor: EditorService) {
    super(editor, 'master');
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas.addEventListener('contextmenu', this.onContextMenu.bind(this));

    this.tools.push(new MoveViewTool(editor, 'move'));
    this.tools.push(new DraggingNodeTool(editor, 'drag'));
    this.tools.push(new DeleteTool(editor, 'delete'));
    this.tools.push(new EdgeDeleteTool(editor, 'delete-edge'));
    this.tools.push(new ConnectTool(editor, 'connect'));
    this.tools.push(new DetailsTool(editor, 'details'));
  }


  async onMouseDown(ev: MouseEvent) {
    this.tools.forEach(tool => tool.onMouseDown(ev));
  }

  async onMouseMove(ev: MouseEvent) {
    this.tools.forEach(tool => tool.onMouseMove(ev));
  }

  async onMouseUp(ev: MouseEvent) {
    this.tools.forEach(tool => tool.onMouseUp(ev));
  }

  async onContextMenu(ev: MouseEvent) {
    this.tools.forEach(tool => tool.onContextMenu(ev));
    ev.preventDefault();
  }

  cleanup() {

  }

  select(toolName: string) {
    const tool = this.tools.find(tool => tool.name === toolName);
    this.tools.forEach(t => t.deselected());
    if (tool) tool.selected();
  }

  toolIsActive(toolName: string) {
    const tool = this.tools.find(tool => tool.name === toolName);
    return tool?.isActive;
  }
}
