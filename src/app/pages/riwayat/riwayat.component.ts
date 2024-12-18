import { Component } from '@angular/core';
import { RiwayatService } from './riwayat.service';
import { Subject, tap } from 'rxjs';
import { RiwayatDTO } from './dtos/result.dto';
import 'datatables.net';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.component.html',
  styleUrl: './riwayat.component.css',
})
export class RiwayatComponent {
  constructor(private riwayatService: RiwayatService) {}

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

  convertToPercentage(value: any): string {
    const num = Number(value);
    return isNaN(num) ? '0.00%' : `${(num * 100).toFixed(2)}%`;
  }
}
