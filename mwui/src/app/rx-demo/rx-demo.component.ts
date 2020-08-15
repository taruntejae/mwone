import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, Observable, zip, from, interval, BehaviorSubject, fromEvent } from 'rxjs';
import { delay, map, debounceTime, tap, concatAll } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxDemoComponent implements OnInit {

  protected readonly words: string[] = [];
  protected readonly urls: string[] = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
  ];
  protected url$: Observable<any> = null;
  protected todos$: Subject<any> = null;
  protected todoList: any[] = [];

  @ViewChild('searchBox') searchBox;
  protected search$: any = null;
  public showSuggestion: boolean = true;
  protected suggestions: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, ) {
    this.url$ = from(this.urls);
    this.todos$ = new Subject();
    this.words = ["i", "have", "broken", "my", "heart", "so", "many", "times", "stopped", "keeping", "track"];
    console.log(this.words)
  }

  ngOnInit() {

    this.search$ = fromEvent(this.searchBox.nativeElement, 'keyup').subscribe((data) => {
      this.handleInput(data);
    });

    this.todos$.subscribe(todo => {
      this.todoList.push(todo);
      this.cdr.detectChanges();
    });
    this.url$.pipe(
      map(item => this.http.get(item)),
      concatAll(),
      // tap( d => console.log(JSON.stringify(d, ['title', 'id'])) ),
    ).subscribe(todo => {
      this.todos$.next(todo);
    });


  }

  handleInput(event) {
    let term = event.target.value;
    this.suggestions = this.words.filter(item => {
      if (term != '') {
        if (item.toLowerCase().indexOf(term.toLowerCase()) == -1) {
          return false;
        } else {
          return true;
        };
      }
    });

    if (this.suggestions.length > 0) {
      this.showSuggestion = true;
    } else {
      this.showSuggestion = false;
      this.suggestions = [];
    }
    this.cdr.detectChanges();
  }

  selectSuggestion(term){
    let val = this.words[this.words.indexOf( term )];
    this.showSuggestion = false;
    this.suggestions = [];
    this.searchBox.nativeElement.value = val;
    console.log(val);
  }
}