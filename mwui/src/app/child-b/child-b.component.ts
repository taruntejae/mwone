import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-child-b',
  templateUrl: './child-b.component.html',
  styleUrls: ['./child-b.component.scss']
})
export class ChildBComponent implements OnInit {

  sharedValue: string = null;

  constructor(protected ds: DataService, protected cdr: ChangeDetectorRef, ) { }

  ngOnInit() {
    this.ds.sharableValue.subscribe( val => {
      this.sharedValue = val;
      this.cdr.detectChanges();
    })
  }

}
