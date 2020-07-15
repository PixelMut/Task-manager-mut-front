import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {empty} from 'rxjs/internal/observable/empty';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor{

  constructor(private authSrv: AuthService) { }

  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
    // handle the request
    request = this.addAuthHeader(request);

    // call next and handle response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status === 401 ){
          // 401 : Unauthorized
          // we want to refresh the access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(()=>{
                request = this.addAuthHeader(request);
                return next.handle(request)
              }),
              catchError((err: any)=>{
                console.log(err);
                this.authSrv.logout();
                return empty();
              })
          );
        }
        return throwError(error)
      })
    )
  }

  refreshAccessToken(){

    if(this.refreshingAccessToken){
      return new Observable(observer =>{
        this.accessTokenRefreshed.subscribe(()=>{
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    }else{
      this.refreshingAccessToken = true;
      // we want to call a method in auth srv to senda request to refresh the access token
      // "tap" is like "subscribe", but "tap" will just observe the response
      return this.authSrv.getNewAccessToken().pipe(
        tap(()=>{
          console.log('Access Token Refreshed');
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      )
    }
  }

  addAuthHeader(request: HttpRequest<any>){
    // get the access token
    const token = this.authSrv.getAccessToken();

    if(token){
      //than happend it to the request header
      return request.clone({
        setHeaders : {
          'x-access-token' : token
        }
      })
    }
    return request;
  }
}
