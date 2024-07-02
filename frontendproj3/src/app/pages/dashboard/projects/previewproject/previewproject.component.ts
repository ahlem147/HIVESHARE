import { Component } from '@angular/core';
import { ProjectService } from '../../../../core/services/project.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule,FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-previewproject',
  standalone: true,
  imports: [RouterModule,RouterOutlet,TodoComponent],
  templateUrl: './previewproject.component.html',
  styleUrl: './previewproject.component.css'
})
export class PreviewprojectComponent {
id:any;
projects:any
team:any
files:any=[]



constructor(private _project:ProjectService, private _router:Router,private _act:ActivatedRoute,
   private FB:FormBuilder){

}

ngOnInit(): void {
this.id=this._act.snapshot.paramMap.get('id');
this._project.preview(this.id).subscribe({
  next:(res)=>{
    this.projects=res
  },
  error:(err)=>{
    console.log(err);
    
  }
})
  
}






















































}
