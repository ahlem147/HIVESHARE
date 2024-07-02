import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }
  //nestaamlouha generalement f  les guards
  isLoggedIn() {
     let token = localStorage.getItem('token');
     if(token){
      return true;
     }
     else {
     return false
     }
  }
// nestaamlouha fel affichage taa lma3loumet taa luser li dejja loggid in o bsh nkhthou e role  o hassb role naatih les acces 
getUsrDataFromToken(){
  let token = localStorage.getItem('token');
  if(token){
return JSON.parse(window.atob(token.split('.')[1]))
}
}




}
