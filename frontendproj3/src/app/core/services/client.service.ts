import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
url = 'http://127.0.0.1:3000/client/'
  constructor(private http:HttpClient) {

   }

    createclient(data:any){
    return this.http.post(this.url +'create',data);
   }
    byid(id:any){
    return this.http.get(this.url +'byid/'+id);
   }
    all (){
    return this.http.get(this.url +'list');

   }
   updateclient(id:any,data:any)
{
  return this.http.put(this.url +'update/'+id,data)
}
deleteclient(id:any){
  return this.http.delete(this.url +'delete/'+id);
}

}
