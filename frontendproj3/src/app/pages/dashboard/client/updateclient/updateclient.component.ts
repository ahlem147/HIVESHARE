import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControl,Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../../../../core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-updateclient',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateclient.component.html',
  styleUrl: './updateclient.component.css'
})
export class UpdateclientComponent {
  id:any;
  clientForm: FormGroup;
  image:any
  client:any
  constructor(private FB:FormBuilder,
     private _client:ClientService, 
     private _act:ActivatedRoute,
    private _router:Router){
 let controls = {
   fullname: new FormControl('',[Validators.required]),
   email: new FormControl('',[Validators.required, Validators.email]),
   tel:new FormControl('',[Validators.required, Validators.minLength(8),]),
   address:new FormControl('',[Validators.required])
 
 }
 this.clientForm =this.FB.group(controls);
 }
 ngOnInit(): void {
  this.id=this._act.snapshot.paramMap.get('id')
  this._client.byid(this.id).subscribe({
    next:(res)=>{
      //yjib l'info
      this.clientForm.reset(res)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  
 }
 send(){
  let fd = new  FormData();
  fd.append('fullname',this.clientForm.value.fullname);
  fd.append('email',this.clientForm.value.email);
  fd.append('tel',this.clientForm.value.tel);
  fd.append('address',this.clientForm.value.address);
  if(this.image){
    fd.append('image',this.image);

  }
  this._client.updateclient(this.id,fd).subscribe({
    next:(res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your client has been updated",
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
