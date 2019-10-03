import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ToDo} from './toDo';
import {environment} from '../../environments/environment';

@Injectable()
export class ToDoListService {
  readonly toDoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getToDos(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(this.toDoUrl);
  }

  getToDoById(id: string): Observable<ToDo> {
    return this.httpClient.get<ToDo>(this.toDoUrl + '/' + id);
  }

  filterToDos(toDos: ToDo[], searchOwner?: string, searchCategory?: string): ToDo[] {

    let filteredToDos = toDos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLowerCase();

      filteredToDos = filteredToDos.filter(toDo => {
        return !searchOwner || toDo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }
    //filter by category
    if(searchCategory != null){
      searchCategory = searchCategory.toLowerCase();

      filteredToDos = filteredToDos.filter(toDo => {
        return !searchCategory || toDo.category.toLowerCase().indexOf(searchCategory) !== -1;
      })
    }



    return filteredToDos;
  }
}
