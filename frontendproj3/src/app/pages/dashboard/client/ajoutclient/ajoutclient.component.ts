import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControl,Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../../../../core/services/client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajoutclient',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajoutclient.component.html',
  styleUrl: './ajoutclient.component.css'
})
export class AjoutclientComponent {
 clientForm: FormGroup;
 image:any
 constructor(private FB:FormBuilder, private _client:ClientService , private _router:Router){
let controls = {
  fullname: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required, Validators.email]),
  tel:new FormControl('',[Validators.required, Validators.minLength(8),]),
  address:new FormControl('',[Validators.required])

}
this.clientForm =this.FB.group(controls);
}

send(){
let fd = new  FormData();
fd.append('fullname',this.clientForm.value.fullname);
fd.append('email',this.clientForm.value.email);
fd.append('tel',this.clientForm.value.tel);
fd.append('address',this.clientForm.value.address);
fd.append('image',this.image);
this._client.createclient(fd).subscribe({
  next:(res)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your client has been saved",
      showConfirmButton: false,
      timer: 1500
    });
this._router.navigate(['/dashboard/client/listclient'])
  },
  error:(err)=>{
    console.log(err);
    
  }
})




}
selectedimage(e:any){
  
this.image = e.target.files[0]
}


















}
