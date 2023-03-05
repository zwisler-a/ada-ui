import {Component} from '@angular/core';
import {EditorService} from "../editor.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.css']
})
export class NetworkDetailsComponent {

  network$ = this.editorService.network$.pipe(tap(console.log));

  constructor(private editorService: EditorService) {

  }


  saveNetwork() {
    this.editorService.saveNetwork();
  }
}
