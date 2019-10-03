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

  public toDoOwner: string;
  public toDoStatus: boolean;


  // Inject the ToDoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private toDoListService: ToDoListService) {

  }

  public updateOwner(newOwner: string): void {
    this.toDoOwner = newOwner;
    this.updateFilter();
  }

  public updateFilter() {
    this.filteredToDos =
      this.toDoListService.filterToDos(
        this.toDos,
        this.toDoOwner,
        this.toDoStatus
      );
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
