import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  url = 'http://127.0.0.1:3000/user/'
  constructor(private http: HttpClient) {

  }
  create(user: any) {
    return this.http.post(this.url + 'createuseraccount', user);
  }
  Byid(id: any) {
    return this.http.get(this.url +'byid/'+id);
  }
  all() {
    return this.http.get(this.url + 'list');

  }
  updateuser(id: any, data: any) {
    return this.http.put(this.url + 'update/' + id, data)
  }
  deleteuser(id: any) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  signin(user: any) {
    return this.http.post(this.url + 'signin', user);

  }








}
