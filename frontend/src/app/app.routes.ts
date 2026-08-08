import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { BusListComponent } from './pages/bus-list/bus-list';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection';
import { BookingFormComponent } from './pages/booking-form/booking-form';
import { PaymentComponent } from './pages/payment/payment';
import { ProfileComponent } from './pages/profile/profile';

import { LoginSuccessComponent } from './pages/login-success/login-success';

import { NotFoundComponent } from './shared/not-found/not-found';

import { authGuard } from './core/guards/auth.guard';
import { BookingHistoryComponent }
from './pages/booking-history/booking-history';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'buses',
    component: BusListComponent
  },

  {
  path: 'seats/:id',
  component: SeatSelectionComponent,
  canActivate: [authGuard]
},

  {
    path: 'booking',
    component: BookingFormComponent,
    canActivate: [authGuard]
  },
  {
  path: 'booking-history',
  component: BookingHistoryComponent
},

  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },

  {
    path: 'login-success',
    component: LoginSuccessComponent,
    
  },
  {
  path: 'community',
  loadComponent: () =>
    import('./pages/community/community.component')
      .then(m => m.CommunityComponent)
},

{
  path: 'community/create',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/create-post/create-post.component')
      .then(m => m.CreatePostComponent)
},

{
  path: 'community/post/:id',
  loadComponent: () =>
    import('./pages/post-detail/post-detail.component')
      .then(m => m.PostDetailComponent)
},

  {
    path: '**',
    component: NotFoundComponent
  }

];