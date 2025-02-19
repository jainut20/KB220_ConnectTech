import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'menu',
    loadChildren: () => import('../pages/menu/menu.module').then( m => m.MenuPageModule),
  },
  {
    path: 'otp',
    loadChildren: () => import('../otp/otp.module').then( m => m.OTPPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
