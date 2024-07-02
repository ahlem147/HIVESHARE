import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmployesService } from '../../../../core/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listemp',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './listemp.component.html',
  styleUrl: './listemp.component.css'
})
export class ListempComponent {
  users:any=[]
  image:any
constructor(private _router:Router,
  private _user:EmployesService
){

}
ngOnInit(): void {
  this._user.all().subscribe({
    next:(res)=>{
      this.users=res;
    },
    error:(err)=>{
      console.log(err);
      
    }

  })
}

delete(id:any){
 Swal.fire({
    title: "Êtes-vous sûre",
    text: " Vous ne pourrez pas revenir en arrière !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: " Oui, supprimez-le!"
  }).then((result) => {
    if (result.isConfirmed) {
     this._user.deleteuser(id).subscribe({
      next:(res)=>{
        this.ngOnInit();
      }
     })
    }
  });
}









}






