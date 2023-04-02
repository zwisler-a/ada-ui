import {Tool} from "./tool";
import {EditorService} from "../editor.service";
import {MoveViewTool} from "./move-view.tool";
import {DraggingNodeTool} from "./dragging-node.tool";

export class MasterTool extends Tool {
  tools: Tool[] = [];

  constructor(canvas: HTMLCanvasElement, editor: EditorService) {
    super(editor);
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas.addEventListener('contextmenu', this.onContextMenu.bind(this));

    this.tools.push(new MoveViewTool(editor));
    this.tools.push(new DraggingNodeTool(editor));
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
}
