import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../shared/task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {


  constructor(private route: ActivatedRoute, private taskSrv: TaskService, private router: Router) { }
  listId: string;
  taskId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.listId = params.listId;
      this.taskId = params.taskId;
    });
  }

  updateTask(title: string){
    this.taskSrv.updateTask(this.listId, this.taskId, title).subscribe(()=>{
      this.router.navigate(['/lists', this.listId]);
    })
  }
}
