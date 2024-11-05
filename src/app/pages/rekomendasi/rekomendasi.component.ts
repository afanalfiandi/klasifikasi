import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RekomendasiService } from './rekomendasi.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-rekomendasi',
  templateUrl: './rekomendasi.component.html',
  styleUrl: './rekomendasi.component.css',
})
export class RekomendasiComponent implements OnInit {
  isLoading: boolean = false;

  dataJurusan: any[] = [];
  nama: any = '';
  jurusan: any = '';
  jurusanString: any = '';
  pai: any = '';
  bi: any = '';
  mtk: any = '';
  sej: any = '';
  bing: any = '';
  senbud: any = '';
  ok: any = '';
  fis: any = '';
  jw: any = '';

  constructor(private rekomenService: RekomendasiService) {}
  ngOnInit(): void {
    this.onGetJurusan();
  }
  onGetJurusan() {
    this.rekomenService
      .onGetJurusan()
      .pipe(
        tap((item: any) => {
          this.dataJurusan = item;
        })
      )
      .subscribe();
  }

  onHandleNama(event: any) {
    this.nama = event.target.value;
  }
  onHandleJurusan(event: HTMLSelectElement) {
    this.jurusanString = event.options[event.selectedIndex].text;
    this.jurusan = event.value;
  }
  onHandlePai(event: any) {
    this.pai = event.target.value;
  }
  onHandleBi(event: any) {
    this.bi = event.target.value;
  }
  onHandleMtk(event: any) {
    this.mtk = event.target.value;
  }
  onHandleSej(event: any) {
    this.sej = event.target.value;
  }
  onHandleBing(event: any) {
    this.bing = event.target.value;
  }
  onHandleSenbud(event: any) {
    this.senbud = event.target.value;
  }
  onHandleOk(event: any) {
    this.ok = event.target.value;
  }
  onHandleFis(event: any) {
    this.fis = event.target.value;
  }
  onHandleBj(event: any) {
    this.jw = event.target.value;
  }

  onSubmit() {
    this.rekomenService
      .onSubmit(
        this.nama,
        this.jurusan,
        this.pai,
        this.bi,
        this.mtk,
        this.sej,
        this.bing,
        this.senbud,
        this.ok,
        this.fis,
        this.jw,
        this.jurusanString
      )
      .pipe(
        tap((item: any) => {
          this.isLoading = true;

          setTimeout(() => {
            this.isLoading = false;
            Swal.fire({
              title: 'Rekomendasi Jurusan',
              text: `Berdasarkan nilai yang Anda masukkan, jurusan yang cocok adalah: ${item.rekomendasi} dengan presentase sebesar ${item.accuracy}%`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }, 3000);
        })
      )
      .subscribe();
  }
}
