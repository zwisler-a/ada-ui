import {Component, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-resizeable-container',
  templateUrl: './resizeable-container.component.html',
  styleUrls: ['./resizeable-container.component.css']
})
export class ResizeableContainerComponent {
  private isHandlerDragging = false;
  size?: string = '100px';

  constructor(private el: ElementRef) {
  }

  mouseDown($event: MouseEvent) {
    this.isHandlerDragging = true;
  }

  @HostListener('window:mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    if (!this.isHandlerDragging) {
      return;
    }

    const offset = this.el.nativeElement.offsetTop;
    const elHeight = this.el.nativeElement.clientHeight;

    const pointerRelative = event.clientY - offset;

    const boxAmin = 60;

    this.size = (Math.max(boxAmin, elHeight - pointerRelative)) + 'px';
  }

  @HostListener('window:mouseup')
  mouseUp($event: MouseEvent) {
    this.isHandlerDragging = false;
  }
}
