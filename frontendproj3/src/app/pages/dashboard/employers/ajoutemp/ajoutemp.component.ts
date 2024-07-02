import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,FormBuilder,Validators, FormsModule } from '@angular/forms';
import { EmployesService } from '../../../../core/services/employes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajoutemp',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './ajoutemp.component.html',
  styleUrl: './ajoutemp.component.css'
})
export class AjoutempComponent {
  userForm:FormGroup;
  image:any;
  tags:any=[]
  singletag =''
  constructor(private _emp:EmployesService,
    private _router:Router,
    private FB:FormBuilder
  ){
    let controls = {
      fullname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
      tel:new FormControl('',[Validators.required, Validators.minLength(8),]),
    
    }
    this.userForm =this.FB.group(controls);
    }


send(){ 
  let fd =new FormData();
  fd.append('fullname',this.userForm.value.fullname);
  fd.append('email',this.userForm.value.email);
  fd.append('password',this.userForm.value.password);
  fd.append('tel',this.userForm.value.tel);
  fd.append('tags', JSON.stringify(this.tags));

  fd.append('image',this.image);
this._emp.create(fd).subscribe({
  next:(res)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your employer has been saved",
      showConfirmButton: false,
      timer: 1500
    });
this._router.navigate(['/dashboard/employers/listemp'])
  },
  error:(err)=>{
    console.log(err);
    
  }
})


}

selectedimage(e:any){
  this.image=e.target.files[0];
}

pushtag(){
  this.tags.push(this.singletag);
  this.singletag=''
}





}
