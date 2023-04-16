import {Tool} from "./tool";

export class EdgeDeleteTool extends Tool {

  override isActive = false;

  async onContextMenu(ev: MouseEvent): Promise<void> {
  }

  async onMouseDown(ev: MouseEvent): Promise<void> {
    const node = await this.getElement(ev);
    if (node && this.isActive) {
      await this.editorService.removeEdge(node.node, node.element);
    }
  }

  async onMouseMove(ev: MouseEvent): Promise<void> {
  }

  async onMouseUp(ev: MouseEvent): Promise<void> {
  }

  override selected() {
    this.isActive = true;
  }


  override deselected() {
    this.isActive = false;
  }

}
