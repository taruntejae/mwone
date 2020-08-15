import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(private httpClient: HttpClient,) { }

  loginUser(username, password){
    return this.httpClient.post("api/UserService/login", { username, password });
  }

  createUser( user ){
    return this.httpClient.post("/api/UserService/", user);
  }

  ping(){
    return this.httpClient.get("/api/UserService/ping");
  }

  getTodos(){
    return this.httpClient.get("/api/TodoService");
  }
  createTodo( todo ){
    return this.httpClient.post("api/TodoService", todo)
  }
}


