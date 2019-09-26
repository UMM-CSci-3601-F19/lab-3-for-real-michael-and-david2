import {Component, OnInit} from '@angular/core';
import {ToDoListService} from './toDo-list.service';
import {ToDo} from './toDo';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-toDo-list-component',
  templateUrl: 'toDo-list.component.html',
  styleUrls: ['./toDo-list.component.css'],
  providers: []
})

export class ToDoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public toDos: ToDo[];
  public filteredToDos: ToDo[];

  public toDoName: string;
  public toDoAge: number;


  // Inject the ToDoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private toDoListService: ToDoListService) {

  }

  public updateName(newName: string): void {
    this.toDoName = newName;
    this.updateFilter();
  }

  public updateAge(newAge: number): void {
    this.toDoAge = newAge;
    this.updateFilter();
  }

  public updateFilter() {
    this.filteredToDos =
      this.toDoListService.filterToDos(
        this.toDos,
        this.toDoName,
        this.toDoAge);
  }

  /**
   * Starts an asynchronous operation to update the toDos list
   *
   */
  ngOnInit(): void {
    const toDos: Observable<ToDo[]> = this.toDoListService.getToDos();
    toDos.subscribe(
      returnedToDos => {
        this.toDos = returnedToDos;
      },
      err => {
        console.log(err);
      });
  }
}
