import {Tool} from "./tool";
import {NodeAttributeDto, NodeInputInstanceDto, NodeInstanceDto, NodeOutputInstanceDto} from "../../../api";

export class ConnectTool extends Tool {

  override isActive = false;

  private fromElement?: NodeOutputInstanceDto;
  private fromNode?: NodeInstanceDto;

  async onContextMenu(ev: MouseEvent): Promise<void> {
  }

  async onMouseDown(ev: MouseEvent): Promise<void> {
    if (!this.isActive) return;
    const node = await this.getElement(ev);
    if (!node?.element) return;
    if (this.isOutput(node.type, node.element)) {
      this.fromElement = node.element;
      this.fromNode = node.node;
    }
  }

  async onMouseMove(ev: MouseEvent): Promise<void> {
    if (!this.isActive) return;
  }

  async onMouseUp(ev: MouseEvent): Promise<void> {
    if (!this.isActive) return;
    const node = await this.getElement(ev);
    if (!node?.element) return;
    if (this.isInput(node.type, node.element) && this.fromElement && this.fromNode) {
      await this.editorService.createEdge(
        this.fromNode,
        this.fromElement,
        node.node,
        node.element
      )
    }
  }

  override selected() {
    this.isActive = true;
  }


  override deselected() {
    this.isActive = false;
    this.fromElement = undefined;
  }

  private isOutput(type: string, elem: NodeOutputInstanceDto | NodeInputInstanceDto | NodeAttributeDto): elem is NodeOutputInstanceDto {
    return type === 'output';
  }

  private isInput(type: string, elem: NodeOutputInstanceDto | NodeInputInstanceDto | NodeAttributeDto): elem is NodeInputInstanceDto {
    return type === 'input';
  }

}
