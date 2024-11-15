import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RekomendasiComponent } from './pages/rekomendasi/rekomendasi.component';
import { RiwayatComponent } from './pages/riwayat/riwayat.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'rekomendasi',
    component: RekomendasiComponent,
  },
  {
    path: 'riwayat',
    component: RiwayatComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
