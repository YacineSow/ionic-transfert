import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'transaction', loadChildren: './pages/transaction/transaction.module#TransactionPageModule' },
  { path: 'liste', loadChildren: './pages/liste/liste.module#ListePageModule'},

  { path: 'transaction', loadChildren: './pages/transaction/transaction.module#TransactionPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  //{ path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  //{ path: 'list', loadChildren: './liste/liste.module#ListePageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
