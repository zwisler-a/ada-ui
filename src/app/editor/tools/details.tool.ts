import {Tool} from "./tool";

export class DetailsTool extends Tool {

  override isActive = false;

  async onContextMenu(ev: MouseEvent): Promise<void> {
  }

  async onMouseDown(ev: MouseEvent): Promise<void> {
    const node = await this.getNode(ev);
    if (node && this.isActive) {
      await this.editorService.openDetails(node);
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
