import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../shared/task.service';
import {Router} from '@angular/router';
import {List} from '../../models/list.model';


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskSrv: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createList(title : string){
    this.taskSrv.createList(title).subscribe((list : List)=>{
      // once the list is created, we navigate to main page and select the list
      // console.log(response);
      this.router.navigate( ['/lists', list._id]);
    });
  }
}
