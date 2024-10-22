import { Component } from '@angular/core';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.component.html',
  styleUrl: './riwayat.component.css',
})
export class RiwayatComponent {
  data = ['Eko Muhammad', 'Larasati Rahayu', 'Dwi Marpaung', 'Bunga Rismawar'];
  jurusan = ['TITL', 'TAV', 'TKJ', 'TBSM', 'TEI'];
  records: any[] = [];

  ngOnInit(): void {
    this.populateRecords();
  }

  populateRecords() {
    this.records = this.data.map((student, index) => ({
      no: index + 1,
      nama: student,
      jurusanPilihan: this.jurusan[index],
      agama: this.getRandomScore(),
      indonesia: this.getRandomScore(),
      matematika: this.getRandomScore(),
      sejarah: this.getRandomScore(),
      inggris: this.getRandomScore(),
      seniBudaya: this.getRandomScore(),
      olahraga: this.getRandomScore(),
      fisika: this.getRandomScore(),
      jawa: this.getRandomScore(),
      hasilRekomendasi: this.getRandomJurusan(),
    }));
  }

  getRandomScore(): number {
    return Math.floor(Math.random() * (89 - 72 + 1)) + 72;
  }

  getRandomJurusan(): string {
    return this.jurusan[Math.floor(Math.random() * this.jurusan.length)];
  }
}
