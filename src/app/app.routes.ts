import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
    canMatch: [
      NotAuthenticatedGuard,
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashborad/admins-dashboard.routes').then(m => m.adminsDashBoradRoutes),
  },

  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes').then(m => m.storeFrontRoutes),
  },

];
