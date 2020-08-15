import { Component, OnInit, Input, HostListener, Output, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  @Input() count;
  @Output() resetEm: EventEmitter<any> = new EventEmitter();

  today: Date;
  constructor() { }

  ngOnInit() {
    this.today = new Date(2020, 12, 23);
  }
  ngOnChanges(prev){
    let change = prev.count;
  }

  @HostListener('contextmenu', ['$event'])
  resetCount(e){
    e.preventDefault();
    this.resetEm.emit();
  }

}
