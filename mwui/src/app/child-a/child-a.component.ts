import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.scss']
})
export class ChildAComponent implements OnInit {

  sharedValue: string = null;
  constructor( protected ds: DataService, protected cdr: ChangeDetectorRef, ) { }

  ngOnInit() {
    this.ds.sharableValue.subscribe( val => {
      this.sharedValue = val;
      this.cdr.detectChanges();
    });
  }
}
