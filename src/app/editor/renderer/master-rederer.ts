import {NodeRenderer} from "./node-renderer";
import {EdgeRenderer} from "./edge-renderer";
import {Subject} from "rxjs";
import {Camera} from "./camera";
import {RasterRenderer} from "./raster-renderer";
import {NetworkDto} from "../../../api";

export class MasterRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  nodeRenderer: NodeRenderer;
  edgeRenderer: EdgeRenderer;
  rasterRenderer: RasterRenderer;
  postProcessManipulations = new Subject<CanvasRenderingContext2D>();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw new Error("Canvas error")
    }
    this.nodeRenderer = new NodeRenderer(this.ctx);
    this.edgeRenderer = new EdgeRenderer(this.ctx);
    this.rasterRenderer = new RasterRenderer(this.ctx);
  }

  render(network: NetworkDto, camera: Camera) {
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.rasterRenderer.render(camera);
      this.nodeRenderer.render([...network.nodes].reverse(), camera);
      this.edgeRenderer.render(network.edges, network.nodes, camera);
      this.postProcessManipulations.next(this.ctx);
    });
  }
}
