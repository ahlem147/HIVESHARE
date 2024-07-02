import { Component } from '@angular/core';
import { EmployesService } from '../../../core/services/employes.service';
import { UserService } from '../../../core/services/user.service';
import { ProjectService } from '../../../core/services/project.service';
import { ClientService } from '../../../core/services/client.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  saleData = [
    { name: "clients", value: 0 },
    { name: "teams", value: 0 },
    { name: "projects", value: 0 },
   
  ];



teams:any;
projects:any;
clients:any;

constructor(private _emp:EmployesService, private _clt:ClientService,private _proj:ProjectService){

}

ngOnInit(): void {
this.getAllClients();
this.getAllProjects();
this.getAllEmployers();
  
}

getAllClients(){
this._clt.all().subscribe({
  next:(res)=>{
this.clients=res;
this.saleData[0].value = this.clients.length
console.log(this.saleData[0].value);
console.log(this.clients.length);

  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

getAllEmployers(){
  this._emp.all().subscribe({
    next:(res)=>{
  this.teams=res;
  this.saleData[1].value = this.teams.length


    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

getAllProjects(){
  this._proj.list().subscribe({
    next:(res)=>{
  this.projects=res;
  this.saleData[2].value = this.projects.length
console.log(this.saleData[0].value);
console.log(this.clients.length);

    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}




}
