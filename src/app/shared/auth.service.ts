import { Injectable } from '@angular/core';

import {WebRequestService} from './web-request.service';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private websrv: WebRequestService, private router : Router, private http: HttpClient) { }

  login(email: string, pwd:string): Observable<any>{
    return this.websrv.login(email, pwd).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        // the auth token will be in the header of the response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log('logged in');
      })
    )
  }

  signup(email: string, pwd:string): Observable<any>{
    return this.websrv.signup(email, pwd).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        // the auth token will be in the header of the response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log('SIGNED UP');
      })
    )
  }

  logout(){
    this.removeSession();
    this.router.navigateByUrl('/login');
  }

  getAccessToken(){
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string){
    localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken(){
    return localStorage.getItem('x-refresh-token');
  }

  setRefreshToken(refreshToken: string){
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  getUserId(){
    return localStorage.getItem('user-id');
  }

  private setSession(userId: string, accessToken: string, refreshToken: string){
    localStorage.setItem('user-id',userId);
    localStorage.setItem('x-access-token',accessToken);
    localStorage.setItem('x-refresh-token',refreshToken);
  }

  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');

  }

  getNewAccessToken(){
    return this.http.get(`${this.websrv.ROOT_URL}/users/me/access-token`, {
      headers : {
        'x-refresh-token' : this.getRefreshToken(),
        '_id' : this.getUserId()
      },
      observe : 'response'
    }).pipe(
      tap((res: HttpResponse<any>)=>{
        this.setAccessToken(res.headers.get('x-access-token'))
      })
    )
  }


}
