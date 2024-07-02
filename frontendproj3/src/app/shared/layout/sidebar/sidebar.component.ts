import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthentificationService } from '../../../core/auth/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user:any
   isSidebarCollapsed = false;
constructor(private _auth:AuthentificationService){

}
ngOnInit(): void {
  this.user =this._auth.getUsrDataFromToken();
  
}
toggleSidebar() {
  this.isSidebarCollapsed = !this.isSidebarCollapsed;
}
}
