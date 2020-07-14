import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../shared/task.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Task} from '../../models/task.model';
import {List} from '../../models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists : List[];
  tasks : Task[];

  constructor(private taskSrv: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.taskSrv.getTasks(params.listId).subscribe((tasks: any)=>{
        this.tasks = tasks;
      })
    });

    this.taskSrv.getLists().subscribe((lists:any[])=>{
      this.lists = lists;
    })
  }

  onTaskClick(task: Task){
    // we want to set the task to selected
    this.taskSrv.complete(task).subscribe(()=>{
      console.log('completed successfully');
      task.completed = !task.completed;
    })
  }

}
