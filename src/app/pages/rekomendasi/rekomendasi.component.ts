import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RekomendasiService } from './rekomendasi.service';
import { tap, catchError, of, finalize } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rekomendasi',
  templateUrl: './rekomendasi.component.html',
  styleUrl: './rekomendasi.component.css',
})
export class RekomendasiComponent implements OnInit {
  isLoading: boolean = false;
  selectedFile: File | null = null;

  dataJurusan: any[] = [];
  nama: any = null;
  jurusan: any = null;
  jurusanString: any = null;
  pai: any = null;
  bi: any = null;
  mtk: any = null;
  sej: any = null;
  bing: any = null;
  senbud: any = null;
  ok: any = null;
  fis: any = null;
  jw: any = null;

  activeTab: number = 0;
  role!: number;

  constructor(
    private rekomenService: RekomendasiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.onGetJurusan();
    this.onGetUserData();
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

  onSelectTab(val: number) {
    this.activeTab = val;
  }

  onSubmit() {
    if (
      !this.nama ||
      !this.jurusan ||
      !this.jurusanString ||
      !this.pai ||
      !this.bi ||
      !this.mtk ||
      !this.sej ||
      !this.bing ||
      !this.senbud ||
      !this.ok ||
      !this.fis ||
      !this.jw
    ) {
      Swal.fire({
        title: 'Data Tidak Lengkap',
        text: `Mohon lengkapi formulir data terlebih dahulu!`,
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } else {
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

            if (item) {
              this.isLoading = false;
              const jurusan = item.classification_results.predicted_jurusan;
              const percentage = (
                item.aggregate_metrics.accuracy * 100
              ).toFixed(2);

              Swal.fire({
                title: 'Rekomendasi Jurusan',
                html: `Berdasarkan nilai yang Anda masukkan, jurusan yang cocok adalah: <b>${jurusan}</b> dengan presentase akurasi sebesar <b>${percentage}%</b>`,
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((res) => {
                if (res.isConfirmed) {
                  this.router.navigate(['/riwayat']);
                }
              });
            }
          })
        )
        .subscribe();
    }
  }

  async onGetUserData() {
    const data = JSON.parse(localStorage.getItem('authData') || '[]');

    setTimeout(() => {
      this.role = data[0].id_role;
    }, 200);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Menyimpan file yang dipilih
    } else {
      this.selectedFile = null;
    }
  }

  // Mengirim file
  onSubmitFile(): void {
    if (!this.selectedFile) {
      alert('Silakan pilih file terlebih dahulu.');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.rekomenService
      .onUpload(this.selectedFile)
      .pipe(
        tap((res) => {
          if (res) {
            Swal.fire({
              title: 'Upload file',
              text: `File ${this.selectedFile?.name} berhasil diunggah`,
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((res) => {
              if (res.isConfirmed) {
                this.router.navigate(['/riwayat']);
              }
            });
          }
        }),
        catchError((err: any) => {
          Swal.fire({
            title: 'Upload file',
            text: `File ${this.selectedFile?.name} gagal diunggah`,
            icon: 'warning',
            confirmButtonText: 'OK',
          });
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  onDownload() {
    const fileName = 'data_template.csv'; // Nama file yang akan didownload
    this.rekomenService.downloadCSV(fileName).subscribe(
      (response) => {
        // Membuat URL untuk file blob
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Tentukan nama file saat diunduh
        a.click();
        window.URL.revokeObjectURL(url); // Hapus URL untuk membersihkan memori
      },
      (error) => {
        console.error('Error downloading the file', error);
      }
    );
  }
}
