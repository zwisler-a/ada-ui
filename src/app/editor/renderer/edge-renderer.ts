import {linePadding, rowTextSize} from './constants';
import {connect} from '../util/drawing-utility';
import {Camera} from './camera';
import {EdgeDto, NodeInputDefinitionDto, NodeInstanceDto, NodeOutputInstanceDto} from "../../../api";

export class EdgeRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {
  }

  render(edges: EdgeDto[], nodes: (NodeInstanceDto & { pos?: any })[], camera: Camera) {
    edges.forEach((edge) => this._renderEdge(edge, nodes, camera));
  }

  _renderEdge(edge: EdgeDto, nodes: (NodeInstanceDto & any)[], cam: Camera) {
    const startElement = nodes
      .find((node) => node.identifier === edge.inputNodeIdentifier)
      ?.inputs?.find((input: NodeInputDefinitionDto) => input.identifier === edge.inputIdentifier);

    const endElement = nodes
      .find((node) => node.identifier === edge.outputNodeIdentifier)
      ?.outputs?.find((input: NodeOutputInstanceDto) => input.identifier === edge.outputIdentifier);
    if (!startElement) return console.log('missing start', edge, nodes);
    if (!endElement) return console.log('missing end', edge);
    this.ctx.strokeStyle = 'black';

    const start = {
      x: cam.transX(
        startElement.pos.x > endElement.pos.x
          ? startElement.pos.x
          : startElement.pos.x + startElement.pos.width,
      ),
      y: cam.transY(startElement.pos.y + linePadding / 2 + rowTextSize / 2),
    };
    const end = {
      x: cam.transX(
        endElement.pos.x > startElement.pos.x
          ? endElement.pos.x
          : endElement.pos.x + endElement.pos.width,
      ),
      y: cam.transY(endElement.pos.y + linePadding / 2 + rowTextSize / 2),
    };

    this.ctx.lineWidth = 2;
    connect(this.ctx, start, end);
    this.ctx.lineWidth = 1;
  }
}
