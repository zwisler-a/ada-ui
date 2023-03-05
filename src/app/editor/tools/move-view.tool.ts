import {Tool} from "./tool";

export class MoveViewTool extends Tool {
  private draggingViewport = false;

  async onContextMenu(ev: MouseEvent) {
  }

  async onMouseDown(ev: MouseEvent) {
    const clickedNode = await this.getNode(ev);
    if (!clickedNode) {
      this.draggingViewport = true;
    }
  }

  async onMouseMove(ev: MouseEvent) {
    if (!this.draggingViewport) {
      return;
    }
    const cam = this.editorService.camera$.value;
    cam.x = cam.x - ev.movementX;
    cam.y = cam.y - ev.movementY;
    this.editorService.updateCamera(cam);
  }

  async onMouseUp(ev: MouseEvent) {
    this.draggingViewport = false;
  }

}
