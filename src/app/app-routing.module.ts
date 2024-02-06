import { AuthGuard } from './_guards/auth.guard';
import { PermisoGuard } from './_guards/permiso.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LayoutComponent } from './layout/layout.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarAcreedorComponent } from './acreedor/registrar-acreedor/registrar-acreedor.component';
import { ConsultarAcreedorComponent } from './acreedor/consultar-acreedor/consultar-acreedor.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [PermisoGuard] },
  {
    path: 'layout',
    children: [
      {
        path: '', component: LayoutComponent, canActivate: [AuthGuard], canActivateChild: [PermisoGuard],
        children: [
          { path: '', component: HomeComponent },
          { path: 'dashboard', component: DashboardComponent },
           { path: 'acreedor/registrar', component: RegistrarAcreedorComponent },
           { path: 'acreedor/consultar', component: ConsultarAcreedorComponent },
        ]
      }
    ]
  },
  { path: '**', component: LoginComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
