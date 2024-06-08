import { Routes } from '@angular/router';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { BookingDetailComponent } from './pages/booking-detail/booking-detail.component';
import { ScanQrComponent } from './pages/scan-qr/scan-qr.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { authRouteGuardGuard } from './auth-route-guard.guard';
import { LogoutComponent } from './component/logout/logout.component';
import { UsaBookingListComponent } from './component/usa-booking-list/usa-booking-list.component';
import { UsaBookingDetailComponent } from './pages/usa-booking-detail/usa-booking-detail.component';

export const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full'},
  { path: 'booking-list', component: BookingListComponent, canActivate: [authRouteGuardGuard] },
  { path: 'usa-booking-list', component: UsaBookingListComponent, canActivate: [authRouteGuardGuard] },
  { path: 'booking-details/:id', component: BookingDetailComponent, canActivate: [authRouteGuardGuard] },
  { path: 'usa-booking-details/:id', component: UsaBookingDetailComponent, canActivate: [authRouteGuardGuard] },

  { path: 'scan-qr-code', component: ScanQrComponent, canActivate: [authRouteGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent, canActivate: [authRouteGuardGuard] }
];
