import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../shared/task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
  selectedListId: string;

  constructor(private taskSrv: TaskService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      if(params.listId){
        this.selectedListId = params.listId;
        this.taskSrv.getTasks(params.listId).subscribe((tasks: any)=>{
          this.tasks = tasks;
        })
      }else{
        this.tasks = undefined;
      }

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

  // Click on delete list
  onDeleteListClick(){
    this.taskSrv.deleteList(this.selectedListId).subscribe((res)=>{
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  // click on delete task
  onDeleteTaskClick(taskId: string){
    this.taskSrv.deleteTask(this.selectedListId, taskId).subscribe((res)=>{
      this.tasks = this.tasks.filter(val=>val._id !== taskId);
      console.log(res);
    })
  }


}
