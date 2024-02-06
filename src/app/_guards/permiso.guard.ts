import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoGuard  {

  constructor(private router: Router) {

  }
  /**
    * Método para validar si un usuario tiene permisos para acceder a una ruta
    */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Si el usuario no tiene los permisos verifica si el usuario está logueado
    if (route.data['permiso']) {
      //Verifica si existe un usuario logueado y si tiene permisos de acceso al sistema
      if (localStorage.getItem('currentUser') != null && this.expira()) {
        //Si está logueado y tiene acceso al sistema pero no tiene asignado este permiso entonces
        //redirige a la pantalla principal del sistema
        this.router.navigate(['layout']);
        return false;
      } else {
        localStorage.clear()
        //Si no tiene permisos ni está loqueado redirige al login
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      //Si tiene el permiso puede acceder
      return true;
    }
  }

  /**
    * Método para cerrar la sesion del usuario que inició sesión
    */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('currentUser')!=null  && this.expira()) {
      // si estas logueado regresa true
      this.router.navigate(['layout']);
      return false;
    } else {
      localStorage.clear()
    // this.router.navigate(['login']);

      // Si no estas logueado te redirecciona a la pagina de login
      return true;
    }

  }

  logout() {
    // se elimina localmente el usuario
    localStorage.clear()
    //Redirige al login
    this.router.navigate(['/login'])
  }
  expira() :boolean{
    let date = localStorage.getItem('saved');
    if(localStorage.getItem('saved')==null) return false
    let date2 = new Date()
    let date1 = new Date(date + "")
    //console.log(date2+"-"+date1)
    console.log(date1.getDay()+"-"+((Number)(date2.getDay())))
    if (((Number)(date1.getDay())) !=((Number)(date2.getDay()))) {
      localStorage.clear()
      return false
    }
    return true

  }
}
