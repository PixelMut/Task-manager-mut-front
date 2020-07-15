import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../shared/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {


  constructor(private route: ActivatedRoute, private taskSrv: TaskService, private router: Router) { }
  listId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.listId = params.listId;
    });
  }

  updateList(title: string){
    this.taskSrv.updateList(this.listId, title).subscribe(()=>{
      this.router.navigate(['/lists', this.listId]);
    })
  }


}
