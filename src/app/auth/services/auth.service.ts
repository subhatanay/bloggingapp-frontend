import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { environment } from 'src/environments/environment';
import { IAuthResponse } from '../types/authResponse.interface';
import { ILoginRequest } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: IRegisterRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<IAuthResponse>(url, data)
      .pipe(map((response: IAuthResponse) => response.user));
  }

  login(data: ILoginRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/users/login';
    return this.http
      .post<IAuthResponse>(url, data)
      .pipe(map((response: IAuthResponse) => response.user));
  }

  getCurrentUser(): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/user';
    return this.http
      .get(url)
      .pipe(map((response: IAuthResponse) => response.user));
  }
}
