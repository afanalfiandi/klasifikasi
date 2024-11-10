import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RiwayatService {
  constructor(private http: HttpClient) {}

  onGetRiwayat() {
    const url = environment.apiUrl + '?act=getRiwayat';

    return this.http.get<Observable<any[]>>(url);
  }
}
