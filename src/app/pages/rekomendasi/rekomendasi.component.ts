import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rekomendasi',
  templateUrl: './rekomendasi.component.html',
  styleUrl: './rekomendasi.component.css',
})
export class RekomendasiComponent {
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    const rekomendasi = [
      'Teknik Audio & Video',
      'Teknik dan Bisnis Sepeda Motor',
      'Teknik Elektronika Industri',
      'Teknik Instalasi Tenaga Listrik',
      'Teknik Komputer Jaringan',
    ];

    function getRandomRecommendation() {
      const randomIndex = Math.floor(Math.random() * rekomendasi.length);
      return rekomendasi[randomIndex];
    }

    const recommendedMajor = getRandomRecommendation();

    setTimeout(() => {
      this.isLoading = false;
      Swal.fire({
        title: 'Rekomendasi Jurusan',
        text: `Berdasarkan nilai yang Anda masukkan, jurusan yang cocok adalah: ${recommendedMajor}`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }, 3000);
  }
}
