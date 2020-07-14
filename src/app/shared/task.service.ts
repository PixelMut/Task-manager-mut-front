import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqSrv : WebRequestService) { }

  // get all lists
  getLists(){
    return this.webReqSrv.get('lists');
  }

  // Create a new List
  createList(title: string){
    return this.webReqSrv.post('lists',{title});
  }

  // get all tasks of a list
  getTasks(listId){
    return this.webReqSrv.get(`lists/${listId}/tasks`);
  }

  // create a task in a list
  createTask(title: string, listId: string){
    return this.webReqSrv.post(`lists/${listId}/tasks`,{title});
  }

  // to validate a task
  complete(task : Task){
    return this.webReqSrv.patch(`lists/${task._listId}/tasks/${task._id}`,{completed : !task.completed})
  }

}
