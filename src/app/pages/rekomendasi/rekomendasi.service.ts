import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RekomendasiService {
  constructor(private http: HttpClient) {}

  onSubmit(
    nama?: any,
    jurusan?: any,
    pai?: any,
    bi?: any,
    mtk?: any,
    sej?: any,
    bing?: any,
    senbud?: any,
    ok?: any,
    fis?: any,
    jw?: any,
    jurusanString?: any
  ) {
    let qParams = new HttpParams()
      .set('nama', nama)
      .set('jurusan', jurusan)
      .set('pai', pai)
      .set('bi', bi)
      .set('mtk', mtk)
      .set('sej', sej)
      .set('bing', bing)
      .set('senbud', senbud)
      .set('ok', ok)
      .set('fis', fis)
      .set('jw', jw)
      .set('jurusanString', jurusanString);

    const url = environment.apiUrl + '?act=onCalculateSingle';

    const option = { params: qParams };
    return this.http.get<Observable<any[]>>(url, option);
  }

  onGetJurusan() {
    const url = environment.apiUrl + '?act=getJurusan';

    return this.http.get<Observable<any[]>>(url);
  }
}
