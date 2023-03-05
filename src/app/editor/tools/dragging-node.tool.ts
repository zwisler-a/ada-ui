import {Tool} from "./tool";
import {NodeInstanceDto} from "../../../api";
import {firstValueFrom} from "rxjs";

export class DraggingNodeTool extends Tool {
  private draggingNode: NodeInstanceDto | undefined;
  private draggingOffset: { x: number; y: number } | undefined;

  async onContextMenu(ev: MouseEvent): Promise<void> {

  }

  async onMouseDown(ev: MouseEvent): Promise<void> {
    const clickedNode = await this.getNode(ev);
    if (!clickedNode) return;
    this.draggingNode = clickedNode;
    this.draggingOffset = {
      x: ev.offsetX - (clickedNode.x ?? 0),
      y: ev.offsetY - (clickedNode.y ?? 0),
    };
  }

  async onMouseMove(ev: MouseEvent): Promise<void> {
    if (this.draggingNode) {
      const network = await firstValueFrom(this.editorService.network$);
      this.draggingNode.x = ev.offsetX - (this.draggingOffset?.x ?? 0);
      this.draggingNode.y = ev.offsetY - (this.draggingOffset?.y ?? 0);
      this.editorService.updateNetwork(network);
    }
  }

  async onMouseUp(ev: MouseEvent): Promise<void> {
    this.draggingNode = undefined;
  }

}
