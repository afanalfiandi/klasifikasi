import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  onAuth(username?: any, password?: any) {
    let qParams = new HttpParams()
      .set('username', username)
      .set('password', password);
    const url = environment.apiUrl + '?act=login';

    const option = { params: qParams };
    return this.http.get<Observable<any[]>>(url, option);
  }
}
