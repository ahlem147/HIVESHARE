import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControl,Validators,FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { EmployesService } from '../../../../core/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateemp',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterOutlet,FormsModule],
  templateUrl: './updateemp.component.html',
  styleUrl: './updateemp.component.css'
})
export class UpdateempComponent {
  userForm:FormGroup;
  image:any;
  id:any
  tags:any=[]
  singletag =''
  constructor(private _emp:EmployesService,
    private _router:Router,
    private FB:FormBuilder,
    private _act:ActivatedRoute
  ){
    let controls = {
      fullname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl(''),
      tel:new FormControl('',[Validators.required, Validators.minLength(8),]),
    
    }
    this.userForm =this.FB.group(controls);
    }

ngOnInit(): void {
  this.id=this._act.snapshot.paramMap.get('id')
 this._emp.Byid(this.id).subscribe({
  next:(res:any)=>{
    this.userForm.reset(res);
    this.tags=res.tags;
  },
  error:(err)=>{
    console.log(err);
    
  }
 })
  
}
send(){ 
  let fd =new FormData();
  fd.append('fullname',this.userForm.value.fullname);
  fd.append('email',this.userForm.value.email);
  fd.append('tel',this.userForm.value.tel);
  fd.append('tags', JSON.stringify(this.tags));
if(this.userForm.value.password){
  fd.append('password',this.userForm.value.password);

}
  if(this.image){
    fd.append('image',this.image);

  }
  this._emp.updateuser(this.id,fd).subscribe({
  next:(res)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your employer has been updated",
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
supptag(index:any){
this.tags.splice(index,1)
}
selectedimage(e:any){
  this.image=e.target.files[0];
}

pushtag(){
  this.tags.push(this.singletag);
  this.singletag=''
}



}