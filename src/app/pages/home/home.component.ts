import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  onStart() {
    const authData = JSON.stringify(localStorage.getItem('authData'));

    if (authData !== 'null') {
      this.router.navigate(['/rekomendasi']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
