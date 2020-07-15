import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  onSignupClicked(email: string, pwd: string){
    this.authSrv.signup(email, pwd).subscribe((res: HttpResponse<any>)=>{
      console.log(res)
    });
  }
}
