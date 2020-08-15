import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpHandlerService } from '../http-handler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mwpage',
  templateUrl: './mwpage.component.html',
  styleUrls: ['./mwpage.component.scss']
})
export class MwpageComponent implements OnInit {

  showLogin: boolean = null;
  loginForm: FormGroup = null;
  todoForm: FormGroup = null;
  pageNum$: any = null;
  currentPageNum: number = null;
  registerForm: FormGroup = null;
  todos: any;
  showTodos: boolean;

  constructor(public httpHandler: HttpHandlerService, private fb: FormBuilder, public ds: DataService, public cdr: ChangeDetectorRef) {
    this.showLogin = true;

    this.loginForm = this.fb.group({
      "username": this.fb.control("", [Validators.required]),
      "password": this.fb.control("", [Validators.required])
    });
    this.registerForm = this.fb.group({
      "username": this.fb.control("", [Validators.required]),
      "password": this.fb.control("", [Validators.required]),
      "address": this.fb.group({
        "country": this.fb.control(""),
        "city": this.fb.control(""),
      }),
    });

    this.todoForm = this.fb.group({
      "title": this.fb.control("", [Validators.required])
    });

    this.pageNum$ = this.ds.pageNumber.subscribe(page => {
      this.currentPageNum = page;
    });
  }

  ngOnInit() {
    this.ds.validateUser();
  }

  formSubmit() {
    if (this.showLogin && this.loginForm.valid) {
      //Login
      this.httpHandler.loginUser(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(data => {
        console.log(data);
        localStorage.setItem("accessToken", data['accessToken']);
        this.ds.currentUser = data["username"];
        this.loginForm.reset();
        this.todos = null;
        this.ds.pageNumber.next(1);
        this.cdr.detectChanges();
      }, (err) => {
        console.log(err);
        alert(err.error.message);
      });
    } else if (this.showLogin == false && this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.httpHandler.createUser(this.registerForm.value).subscribe(data => {
        this.registerForm.reset();
        this.ds.pageNumber.next(0);
        this.showLogin = !this.showLogin;
        alert("Please login.");
        this.cdr.detectChanges();
      }, err => {
        alert(err.reason.message);
      });
    }
  }

  ping(){
    this.httpHandler.ping().subscribe(response =>{
      console.log("Ping successful...");
      this.cdr.detectChanges();
    }, err=>{
      alert(err.reason.message);
      localStorage.setItem("accessToken", "");
      this.ds.pageNumber.next(0);
      this.cdr.detectChanges();
    });
  }

  createTodo(){
    let todo = this.todoForm.value;
    todo["createdBy"] = this.ds.currentUser;
    console.log(this.ds.currentUser, todo);
    this.httpHandler.createTodo(todo).subscribe( data => {
      this.todoForm.reset();
      this.getTodos();
    });
  }

  getTodos(){
    this.httpHandler.getTodos().subscribe( data => {
      this.todos = data;
      console.log(this.todos);
      this.cdr.detectChanges();
    });
  }

  doLogout(){
    localStorage.removeItem("accessToken");
    this.ds.pageNumber.next(0);
    this.cdr.detectChanges();
  }
}
