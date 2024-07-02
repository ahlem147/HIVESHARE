import { Component } from '@angular/core';
import { AuthentificationService } from '../../../core/auth/authentification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
user:any






constructor(private _auth:AuthentificationService){

}
ngOnInit(): void {
 this.user =this._auth.getUsrDataFromToken();
 console.log(this.user);
 
  
}
logout(){
localStorage.removeItem('token');
window.location.reload();
}







}
