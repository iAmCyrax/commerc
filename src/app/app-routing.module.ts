import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  ProductsComponent,
  LikedProductsComponent,
  CartComponent,
  ErrorComponent,
  LoginComponent,
  SignUpComponent,
  AdminComponent,
  DashboardUserDetailsComponent,
} from './pages';
import { AccountGuard, AuthGuard, AdminGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Commerc',
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'all-products',
    component: ProductsComponent,
    title: 'All Products | Commerc',
  },
  {
    path: 'liked-products',
    component: LikedProductsComponent,
    title: 'Liked Products | Commerc',
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart | Commerc',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    title: 'Dashboard | Commerc',
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard/user/:id',
    component: DashboardUserDetailsComponent,
    title: 'Dashboard | Commerc',
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login | Commerc',
    canActivate: [AccountGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign Up | Commerc',
    canActivate: [AccountGuard],
  },
  {
    path: '**',
    // redirectTo: "",
    component: ErrorComponent,
    // İkisinden biri!
    title: '404 Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
