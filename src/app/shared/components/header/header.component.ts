import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  isLogedIn: boolean = false;

  ngOnInit(): void {
    this.onCheckLocalStorage();
  }

  onCheckLocalStorage() {
    const authData = JSON.stringify(localStorage.getItem('authData'));

    if (authData !== null || authData !== 'null') {
      this.isLogedIn = true;
    } else {
      this.isLogedIn = false;
    }
  }

  onLogout() {
    localStorage.removeItem('authData');

    this.router.navigate(['auth']);
  }
}
