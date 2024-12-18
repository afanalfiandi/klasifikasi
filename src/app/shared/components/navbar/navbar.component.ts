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
    window.addEventListener('storage', this.onStorageChange);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.onStorageChange);
  }

  ngAfterViewInit(): void {
    this.onCheckLocalStorage();
  }

  ngAfterViewContentChecked(): void {
    this.onCheckLocalStorage();
  }

  onCheckLocalStorage() {
    const authData = localStorage.getItem('authData');
    this.isLogedIn = authData !== null;
  }

  onStorageChange = (event: StorageEvent) => {
    if (event.key === 'authData') {
      this.onCheckLocalStorage(); // Update isLogedIn saat 'authData' diubah
    }
  };

  onLogout() {
    localStorage.removeItem('authData');
    this.isLogedIn = false;

    this.router.navigate(['auth']);
  }
}
