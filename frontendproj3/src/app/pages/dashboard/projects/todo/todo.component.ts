import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../../../core/services/board.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, DragDropModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  @Input() project = '';
  table: any;

  todo = {
    text: '',
    status: 'backlog',
    date: '',
    budget:''
  }

  constructor(private _board: BoardService){}

  ngOnInit(): void {
    
    this._board.byid(this.project).subscribe({
      next:(res)=>{
        this.table = res;
        console.log(res);
        
      }
    })

  }


  onDrop(event: CdkDragDrop<any>){

    if( event.previousContainer === event.container ){

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

      this._board.update(this.table._id, this.table).subscribe({
        next: (res:any)=>{
          this.ngOnInit();
        },
       
      })

    }else{

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

      this._board.update(this.table._id, this.table).subscribe({
        next: (res:any)=>{
          this.ngOnInit();
        }
      })
      
    }
    

  }


  save(){

    if(this.todo.status == 'backlog'){
      this.table.backlog.push(this.todo);
    }
    if(this.todo.status == 'inprogress'){
      this.table.inprogress.push(this.todo);
    }
    if(this.todo.status == 'inhold'){
      this.table.inhold.push(this.todo);
    }
    if(this.todo.status == 'completed'){
      this.table.completed.push(this.todo);
    }

    this._board.update(this.table._id, this.table).subscribe({
      next: (res:any)=>{
        this.ngOnInit();
        this.todo = {
          text: '',
          status: 'backlog',
          date: '',
          budget:''
        }
      }
    })
    

  }

}