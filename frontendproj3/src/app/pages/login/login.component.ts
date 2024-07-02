import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';
import { EmployesService } from '../../core/services/employes.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup;
constructor(private _route:Router, private _FB:FormBuilder , private _user:UserService){
  let controls ={
    email: new FormControl('',[Validators.required,Validators.email]),
    password :new FormControl('',Validators.required)
  }
this.loginForm=this._FB.group(controls);
}

login(){
this._user.signin(this.loginForm.value).subscribe({
  next:(res:any)=>{
localStorage.setItem('token',res.myToken);
this._route.navigate(['/dashboard'])
  },
  error:(err)=>{
    console.log(err);
   Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mail or password invalid!",
      footer: ''
    });
  }
})
}











}
