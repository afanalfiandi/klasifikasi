import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResultDTO } from './dtos/result.dto';

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
      .set('jurusan', 1)
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

    const url = environment.apiUrl + '?act=classification';

    const option = { params: qParams };
    return this.http.get<Observable<any[]>>(url, option);
  }

  onGetJurusan() {
    const url = environment.apiUrl + '?act=getJurusan';

    return this.http.get<Observable<ResultDTO[]>>(url);
  }

  onUpload(file: File): Observable<any> {
    const url = environment.apiUrl + '?act=onUpload';

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(url, formData);
  }

  downloadCSV(fileName: string): Observable<Blob> {
    const fileUrl = `assets/${fileName}`; // Tentukan path file yang akan diunduh
    return this.http.get(fileUrl, { responseType: 'blob' });
  }
}
