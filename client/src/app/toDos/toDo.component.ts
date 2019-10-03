import {Component, OnInit} from '@angular/core';
import {ToDoListService} from './toDo-list.service';
import {ToDo} from './toDo';

@Component({
  selector: 'app-todo-component',
  styleUrls: ['./toDo.component.css'],
  templateUrl: 'toDo.component.html'
})
export class ToDoComponent implements OnInit{
  public toDo: ToDo = null;
  private id: string;

  constructor(private todoListService: ToDoListService){
    // this.toDos = this.toDoListService.getToDos();
  }
  private subscribeToServiceForId() {
    if(this.id) {
      this.todoListService.getToDoById(this.id).subscribe(
        toDo => this.toDo = toDo,
        err => {
          console.log(err);
        }
      );
    }
  }
  setId(id: string){
    this.id = id;
    this.subscribeToServiceForId();
  }
  ngOnInit(): void {
    this.subscribeToServiceForId();
  }
}
