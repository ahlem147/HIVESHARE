import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
url='http://127.0.0.1:3000/project/'
  constructor(private http:HttpClient) { }

create(project:any){
  return this.http.post(this.url+'create',project)
}
byid(id:any){
  return this.http.get(this.url+'byid/'+id)
}
list(){
  return this.http.get(this.url+'list')
}
preview(id:any){
  return this.http.get(this.url+'preview/'+id)
}
delete(id:any){
  return this.http.delete(this.url+'delete/'+id)
}
update(id:any,data:any){
  return this.http.put(this.url+'update/'+id,data)
}
}
