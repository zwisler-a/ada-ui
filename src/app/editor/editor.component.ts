import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MasterRenderer} from "./renderer/master-rederer";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest} from "rxjs";
import {Camera} from "./renderer/camera";
import {EditorService} from "./editor.service";
import {MasterTool} from "./tools/master.tool";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('canvas', {read: ElementRef, static: true}) canvas!: ElementRef;


  private masterRenderer!: MasterRenderer;
  private masterTool!: MasterTool;

  constructor(private editorService: EditorService, private activeRoute: ActivatedRoute) {
    combineLatest([this.editorService.network$, this.editorService.camera$]).subscribe(([network, cam]) => {
      this.masterRenderer?.render(network, cam);
    })
    this.activeRoute.params.subscribe(params => {
      const networkId = params['id'];
      this.editorService.loadNetwork(networkId);
    })
  }

  ngAfterViewInit(): void {
    this.masterRenderer = new MasterRenderer(this.canvas.nativeElement);
    this.masterTool = new MasterTool(this.canvas.nativeElement, this.editorService);
  }
}
