import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Horse from '../Utitlity/Horse';
import User from '../Utitlity/User';

@Injectable({
  providedIn: 'root'
})

export default class MyHttpService {

  constructor(private http: HttpClient) { }

  // Your methods using HttpClient here


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('localhost:8080/Pferderennen/Game/ActiveUsers');
  }
}
