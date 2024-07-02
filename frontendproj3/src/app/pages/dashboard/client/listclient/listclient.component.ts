import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import Swal from 'sweetalert2';
import { BreadcrumbComponent } from '../../../../shared/component/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-listclient',
  standalone: true,
  imports: [RouterModule,BreadcrumbComponent],
  templateUrl: './listclient.component.html',
  styleUrl: './listclient.component.css'
})
export class ListclientComponent {
clients :any
constructor(private _client:ClientService){

}
ngOnInit(): void {
  this._client.all().subscribe({
    next:(res)=>{
      this.clients=res
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  
}
delete(id:any){
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
     this._client.deleteclient(id).subscribe({
      next:(res)=>{
        this.ngOnInit();
      }
     })
    }
  });
}
}
