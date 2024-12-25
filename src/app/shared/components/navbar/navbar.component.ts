import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../pages/auth/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isLogedIn: boolean = false;

  ngOnInit(): void {
    this.onCheckLocalStorage();
  }

  ngAfterViewInit(): void {
    this.onCheckLocalStorage();
  }

  ngAfterViewContentChecked(): void {
    this.onCheckLocalStorage();
  }

  onCheckLocalStorage() {
    this.authService.isLoggedIn$
      .pipe(
        tap((res) => {
          const authData = localStorage.getItem('authData');
          this.isLogedIn = authData !== null || res;
        })
      )
      .subscribe();
  }

  onLogout() {
    localStorage.removeItem('authData');
    this.isLogedIn = false;

    this.router.navigate(['auth']);
  }
}
