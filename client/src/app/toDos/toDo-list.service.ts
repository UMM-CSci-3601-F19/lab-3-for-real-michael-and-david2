import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ToDo} from './toDo';
import {environment} from '../../environments/environment';

@Injectable()
export class ToDoListService {
  readonly toDoUrl: string = environment.API_URL + 'toDos';

  constructor(private httpClient: HttpClient) {
  }

  getT(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(this.toDoUrl);
  }

  getToDoById(id: string): Observable<ToDo> {
    return this.httpClient.get<ToDo>(this.toDoUrl + '/' + id);
  }

  filterToDos(toDos: ToDo[], searchOwner?: string, searchAge?: number): ToDo[] {

    let filteredToDos = toDos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLowerCase();

      filteredToDos = filteredToDos.filter(toDo => {
        return !searchOwner || toDo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }



    return filteredToDos;
  }
}
