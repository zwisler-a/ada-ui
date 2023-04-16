import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogSocketService} from "../log-socket.service";
import {scan} from "rxjs/operators";

interface LogEntry {
  level: string;
  message: string;
}

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent implements OnInit, OnDestroy {
  log$ = this.socket.fromEvent<LogEntry>('log').pipe(
    scan<LogEntry, LogEntry[]>((acc, value) => [value, ...acc], [])
  );

  constructor(private socket: LogSocketService) {
    this.log$.subscribe()
  }

  ngOnDestroy(): void {
    this.socket.emit('unsubscribe', {});
  }

  ngOnInit(): void {
    this.socket.emit('subscribe', {});
  }
}
