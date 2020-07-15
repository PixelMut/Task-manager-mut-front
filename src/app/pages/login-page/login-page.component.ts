import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email: string, pwd: string){
    this.authSrv.login(email, pwd).subscribe((res: HttpResponse<any>)=>{
      if(res.status === 200){
        // logged in successfully
        this.router.navigate(['/lists']);
      }
    });
  }
}
