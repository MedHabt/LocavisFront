import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterPlayload } from '../../model/register-playload'
import { Observable, throwError } from 'rxjs';
import { LoginPayload } from '../../model/login-payload';
import { JwtAutResponse } from '../../model/jwt-aut-response';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:9090/api/auth/'; 

  constructor(private httpClient: HttpClient, private localStorageServices : LocalStorageService) { }

  register (registerPlayload: RegisterPlayload): Observable<any>{
     return this.httpClient.post(this.url + 'signup', registerPlayload);
  }

  login(loginPayload: LoginPayload) : Observable<Boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      this.localStorageServices.store('authenticationToken', data.authenticationToken);
      this.localStorageServices.store('userName', data.username);
      return true;
    }));
  }

  handleError(err){
    return throwError(err);
  }
}
