import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onHandleUsername(event: any) {
    this.username = event.target.value;
  }
  onHandlePassword(event: any) {
    this.password = event.target.value;
  }
  onSubmit() {
    this.authService
      .onAuth(this.username, this.password)
      .pipe(
        tap((item: any) => {
          if (item.length) {
            localStorage.setItem('authData', JSON.stringify(item));
            Swal.fire({
              title: 'Sukses!',
              text: `Autentikasi berhasil!`,
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((res) => {
              if (res.isConfirmed) {
                this.router.navigate(['/rekomendasi']);
              }
            });
          } else {
            Swal.fire({
              title: 'Terjadi kesalahan',
              text: `Username atau kata sandi salah!`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        })
      )
      .subscribe();
  }
}
