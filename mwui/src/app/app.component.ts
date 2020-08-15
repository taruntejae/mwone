import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from './data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  username = null;
  clickedTimes = 0;


  constructor(public ds: DataService, ){  }

  ngAfterViewInit(){}

  ngOnInit(){
/*     setTimeout(()=>{
      this.ds.clickedTimes++;
      console.log(this.ds.clickedTimes);
    }, 1000); */
  }

  clickedHello(){
    this.ds.clickedTimes < 10 && this.ds.clickedTimes++;
  }
  resetCount(){
    this.ds.clickedTimes = 0;
  }

}