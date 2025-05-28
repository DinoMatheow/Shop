import { Routes } from '@angular/router';
import { AdminsDashboardLayoutComponent } from './layouts/admins-dashboard-layout/admins-dashboard-layout.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';
import { ProdutcsAdminPageComponent } from './pages/produtcs-admin-page/produtcs-admin-page.component';
import { IsAdminGuard } from '@/auth/guards/is-admin.guard';

export const adminsDashBoradRoutes: Routes = [

  {
    path: '',
    component: AdminsDashboardLayoutComponent,
    canMatch: [
      IsAdminGuard
    ],
    children: [
      {
        path: 'products',
        component: ProdutcsAdminPageComponent
      },
      {
        path:'product/:id',
        component: ProductAdminPageComponent
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }

];

export default adminsDashBoradRoutes;