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

  onExport() {
    const url = environment.apiUrl + '?act=onExport';

    this.http.get(url, { responseType: 'blob' }).subscribe((response) => {
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data_riwayat_rekomendasi.xls';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  onDeleteAll() {
    const url = environment.apiUrl + '?act=onDeleteAll';

    return this.http.get<Observable<any[]>>(url);
  }

  onDeleteById(id: string) {
    let qParams = new HttpParams().set('id', id);
    const url = environment.apiUrl + '?act=onDeleteById';

    const option = { params: qParams };
    const response = this.http.get<Observable<any>>(url, option);

    return response;
  }
}
