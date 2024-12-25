import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, mergeMap, Observable, of, tap } from 'rxjs';
import { UserDTO } from '../../shared/dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  onAuth(username?: any, password?: any) {
    let qParams = new HttpParams()
      .set('username', username)
      .set('password', password);
    const url = environment.apiUrl + '?act=login';

    const option = { params: qParams };
    const response = this.http.get<Observable<UserDTO>>(url, option);
    response
      .pipe(
        mergeMap((obs) => obs),
        tap((res) => {
          if (res) {
            this.isLoggedIn$.next(true);
          }
        })
      )
      .subscribe();
    return response;
  }
}
