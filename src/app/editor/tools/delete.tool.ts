import {Tool} from "./tool";

export class DeleteTool extends Tool {

  isActive = false;

  async onContextMenu(ev: MouseEvent): Promise<void> {
  }

  async onMouseDown(ev: MouseEvent): Promise<void> {
    const node = await this.getNode(ev);
    if (node && this.isActive) {
      await this.editorService.deleteNode(node);
    }
  }

  async onMouseMove(ev: MouseEvent): Promise<void> {
  }

  async onMouseUp(ev: MouseEvent): Promise<void> {
  }

}
