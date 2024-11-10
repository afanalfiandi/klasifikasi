import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  isLogedIn: boolean = false;

  ngOnInit(): void {
    this.onCheckLocalStorage();
  }

  ngAfterViewInit(): void {
    this.onCheckLocalStorage();
  }

  ngAfterViewContentChecked() {
    this.onCheckLocalStorage();
  }

  onCheckLocalStorage() {
    const authData = JSON.stringify(localStorage.getItem('authData'));

    if (authData === null || authData === 'null') {
      this.isLogedIn = false;
    } else {
      this.isLogedIn = true;
    }
  }

  onLogout() {
    localStorage.removeItem('authData');
    this.isLogedIn = false;

    this.router.navigate(['auth']);
  }
}
