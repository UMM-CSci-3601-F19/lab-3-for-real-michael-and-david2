// Imports
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {ToDoListComponent} from "./toDos/toDo-list.component";

// Route Configuration
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'toDos', component: ToDoListComponent},
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
