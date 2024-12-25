import { Component } from '@angular/core';
import { RiwayatService } from './riwayat.service';
import { Subject, tap } from 'rxjs';
import { RiwayatDTO } from './dtos/result.dto';
import 'datatables.net';
import { Config } from 'datatables.net';
import { UserDTO } from '../../shared/dtos/user.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.component.html',
  styleUrl: './riwayat.component.css',
})
export class RiwayatComponent {
  constructor(private riwayatService: RiwayatService) {}
  isLoading: boolean = false;
  authData!: UserDTO;
  records: RiwayatDTO[] = [];

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      processing: true,
      deferRender: true,
      destroy: true,
    };
    this.getRiwayat();
    this.checkSession();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
  }

  getRiwayat() {
    this.riwayatService
      .onGetRiwayat()
      .pipe(
        tap((data: any) => {
          this.records = data;
        })
      )
      .subscribe();
  }

  checkSession() {
    const authData = localStorage.getItem('authData');

    if (authData) {
      const data = JSON.parse(authData);

      this.authData = {
        id_role: data[0].id_role,
        nama: data[0].nama,
        role: data[0].role,
        username: data[0].username,
      };
    }
  }

  convertToPercentage(value: any): string {
    const num = Number(value);
    return isNaN(num) ? '0.00%' : `${(num * 100).toFixed(2)}%`;
  }

  onExport() {
    this.riwayatService.onExport();
  }

  onDeletAll() {
    this.riwayatService
      .onDeleteAll()
      .pipe(
        tap((res: any) => {
          this.isLoading;

          if (res) {
            if (res.message === 'success') {
              Swal.fire({
                title: 'Sukses!',
                text: `Hapus semua data berhasil!`,
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((res) => {
                if (res.isConfirmed) {
                  this.getRiwayat();
                }
              });
            } else {
              Swal.fire({
                title: 'Gagal!',
                text: `Hapus semua data gagal!`,
                icon: 'warning',
                confirmButtonText: 'OK',
              });
            }
          }
        })
      )
      .subscribe();
  }

  onDeleteById(id: string) {
    this.riwayatService
      .onDeleteById(id)
      .pipe(
        tap((res: any) => {
          this.isLoading;

          if (res) {
            if (res.message === 'success') {
              Swal.fire({
                title: 'Sukses!',
                text: `Hapus data berhasil!`,
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((res) => {
                if (res.isConfirmed) {
                  this.getRiwayat();
                }
              });
            } else {
              Swal.fire({
                title: 'Gagal!',
                text: `Hapus data gagal!`,
                icon: 'warning',
                confirmButtonText: 'OK',
              });
            }
          }
        })
      )
      .subscribe();
  }
}
