import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { EmployesService } from '../../../../core/services/employes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addproject',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css'
})
export class AddprojectComponent {
  projectForm:FormGroup;
  clients:any
  employers:any
  team:any=[];
  files:any;

constructor(private _project:ProjectService,private _router:Router, private FB:FormBuilder,
  private _client:ClientService, private _emp:EmployesService
){
let controls ={
  name: new FormControl('', [Validators.required]),
  description :new FormControl('', [Validators.required]),
  startDate:new FormControl('', [Validators.required]),
  endDate:new FormControl('', [Validators.required]),
  client:new FormControl('', [Validators.required]),
  status:new FormControl('', [Validators.required]),
  budget:new FormControl('', [Validators.required]),
}
this.projectForm=FB.group(controls);
}
ngOnInit(): void {
this._client.all().subscribe({
  next:(res)=>{
this.clients=res;
  }
})
this._emp.all().subscribe({
  next:(res)=>{
this.employers=res;
  }
}) 
}
selectedTeam(e:any){
if(this.team.indexOf(e.target.value)==-1){
  this.team.push(e.target.value);
}
else {
  this.team.splice(this.team.indexOf(e.target.value),1)
}
console.log(this.team);

}

send(){
  let fd =new FormData();
  fd.append('name',this.projectForm.value.name);
  fd.append('description',this.projectForm.value.description);
  fd.append('startDate',this.projectForm.value.startDate);
  fd.append('endDate',this.projectForm.value.endDate);
  fd.append('client',this.projectForm.value.client);
  fd.append('budget',this.projectForm.value.budget);
  fd.append('status',this.projectForm.value.status);
  fd.append('team',JSON.stringify(this.team));
 for(let file of this.files){
  fd.append('files',file)
 }  

 this._project.create(fd).subscribe({
  next:(res)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your project has been saved",
      showConfirmButton: false,
      timer: 1500
    });
this._router.navigate(['/dashboard/projects/listproj'])
  },
  error:(err)=>{
    console.log(err);
    
  }
})


}


selectedFiles(e:any){
  this.files=e.target.files;
}






































































}
