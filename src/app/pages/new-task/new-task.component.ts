import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../shared/task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId : string;

  constructor(private taskSrv: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.listId = params['listId'];
      //console.log(this.listId);
    })
  }

  createTask(title: string){
    this.taskSrv.createTask(title, this.listId).subscribe((newtask : Task)=>{
      // once the list is created, we navigate to main page and select the list
      // console.log(response);
      this.router.navigate( ['../'], { relativeTo: this.route});
    });
  }
}
