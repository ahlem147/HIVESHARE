import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { EmployesService } from '../../../../core/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateproject',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateproject.component.html',
  styleUrl: './updateproject.component.css'
})
export class UpdateprojectComponent {
  projectForm:FormGroup;
  clients:any
  employers:any
  team:any=[];
  files:any=[];
  id:any;

constructor(private _project:ProjectService,private _router:Router, private FB:FormBuilder,
  private _client:ClientService, private _emp:EmployesService,private _act:ActivatedRoute
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
  this.id=this._act.snapshot.paramMap.get('id')
  this._project.byid(this.id).subscribe({
    next: (res:any)=>{
      this.projectForm.reset(res);
      this.team=res.team

    },
    error:(err)=>{
      console.log(err);
      
    }
  })
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
  if(this.files.length>0){
    for(let file of this.files){
      fd.append('files',file)
     }  
    
  }

 this._project.update(this.id,fd).subscribe({
  next:(res)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your project has been updated",
      showConfirmButton: false,
      timer: 1500
    });
this._router.navigate(['/dashboard/projects/preview',this.id])
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
