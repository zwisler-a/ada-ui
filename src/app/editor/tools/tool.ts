import {getClickedElement, getClickedNode} from "../util/util";
import {EditorService} from "../editor.service";
import {firstValueFrom} from "rxjs";

export abstract class Tool {
  isActive: boolean = false;


  protected async getNode(ev: MouseEvent) {
    const network = await firstValueFrom(this.editorService.network$);
    return getClickedNode(
      network.nodes,
      this.editorService.camera$.value.reverseX(ev.offsetX),
      this.editorService.camera$.value.reverseY(ev.offsetY),
    );
  }

  protected async getElement(ev: MouseEvent) {
    const network = await firstValueFrom(this.editorService.network$);
    return getClickedElement(
      network.nodes,
      this.editorService.camera$.value.reverseX(ev.offsetX),
      this.editorService.camera$.value.reverseY(ev.offsetY),
    );
  }

  constructor(protected editorService: EditorService, public readonly name: string) {
  }

  abstract onMouseDown(ev: MouseEvent): Promise<void>;

  abstract onMouseMove(ev: MouseEvent): Promise<void>;

  abstract onMouseUp(ev: MouseEvent): Promise<void>;

  abstract onContextMenu(ev: MouseEvent): Promise<void>;

  selected() {
  };

  deselected() {
  }

}
