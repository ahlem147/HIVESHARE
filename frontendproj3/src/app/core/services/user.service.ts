import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://127.0.0.1:3000/user/'
  constructor(private http: HttpClient) {

  }
  signin(user: any) {
    return this.http.post(this.url + 'signin', user);

  }
}
