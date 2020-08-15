import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public clickedTimes: any;
  
  public sharableValue: BehaviorSubject<string> = null;

  public pageNumber: BehaviorSubject<number> = null;

  public currentUser: any = null;

  constructor() { 
    this.clickedTimes = 0;
    this.sharableValue = new BehaviorSubject( null );
    this.pageNumber = new BehaviorSubject(0);
    // setInterval( ()=> {this.sharableValue.next('some value changed: '+ Math.ceil(Math.random()*100));}, 100);
  }

  validateUser(){
    let akey = localStorage.getItem("accessToken");
    if(akey != null){
      this.pageNumber.next(1);
    }else{
      this.pageNumber.next(0);
    }
  }
}
