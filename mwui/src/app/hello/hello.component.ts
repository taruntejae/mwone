import { Component, OnInit, Input, HostListener, Output, EventEmitter, HostBinding, } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  @Output() clicks = new EventEmitter();

  list: Number[] = [];

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e){
    this.clicks.emit();
  }
}
