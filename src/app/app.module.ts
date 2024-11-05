import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { RiwayatComponent } from './pages/riwayat/riwayat.component';
import { RekomendasiComponent } from './pages/rekomendasi/rekomendasi.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    LayoutComponent,
    RiwayatComponent,
    RekomendasiComponent,
    HomeComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
