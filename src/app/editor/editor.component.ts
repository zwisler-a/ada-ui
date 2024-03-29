import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MasterRenderer} from "./renderer/master-rederer";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, firstValueFrom, Subscription} from "rxjs";
import {EditorService} from "./editor.service";
import {MasterTool} from "./tools/master.tool";
import {Logger} from "../log/logger";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', {read: ElementRef, static: true}) canvas!: ElementRef;


  private masterRenderer!: MasterRenderer;
  masterTool!: MasterTool;
  private renderSubscription!: Subscription;

  constructor(private editorService: EditorService, private activeRoute: ActivatedRoute) {
    this.renderSubscription = combineLatest([this.editorService.network$, this.editorService.camera$]).subscribe(([network, cam]) => {
      this.masterRenderer?.render(network, cam);
    })
    this.activeRoute.params.subscribe(params => {
      const networkId = params['id'];
      Logger.log(`Load network with id ${networkId}`)
      this.editorService.loadNetwork(networkId);
    })
  }

  ngAfterViewInit(): void {
    this.masterRenderer = new MasterRenderer(this.canvas.nativeElement);
    this.masterTool = new MasterTool(this.canvas.nativeElement, this.editorService);
  }

  ngOnDestroy(): void {
    if (this.renderSubscription) this.renderSubscription.unsubscribe();
    this.masterRenderer.cleanup();
    this.masterTool.cleanup();
  }

  selectTool(tool: string) {
    this.masterTool.select(tool);
  }

  undo() {
    this.editorService.undo();
  }

  async save() {
    await this.editorService.saveNetwork();
  }

  async export() {
    const network = await firstValueFrom(this.editorService.network$);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(network));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", network.name + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
