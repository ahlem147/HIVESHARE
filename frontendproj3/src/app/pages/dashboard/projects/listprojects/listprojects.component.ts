import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listprojects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './listprojects.component.html',
  styleUrl: './listprojects.component.css'
})
export class ListprojectsComponent {
projects:any
constructor(private _project:ProjectService,private _act:ActivatedRoute,private_router:Router){

}
ngOnInit(): void {
  this._project.list().subscribe({
    next:(res)=>{
      this.projects=res
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  
}
deleteproject(id:any){
  Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Vous ne pourrez pas revenir en arrière !!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: " Oui, supprimez-le!"
     }).then((result) => {
       if (result.isConfirmed) {
        this._project.delete(id).subscribe({
         next:(res)=>{
           this.ngOnInit();
         }
        })
       }
     });
   }
   













}
