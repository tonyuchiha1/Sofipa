import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    usuario : any ="";
    @Output() toggleSidebarForMe: EventEmitter<string> = new EventEmitter();


    constructor(public router: Router,
      private _snackBar: MatSnackBar) { }
    ngOnInit(): void {
      this.usuario= JSON.parse(localStorage.getItem('currentUser')!);
      console.log(this.usuario.username);

      const mediaQuery = window.matchMedia('(max-width: 600px)');
      console.log(mediaQuery)

     }
    toggleSidebar() {
      this.toggleSidebarForMe.emit()
          // console.log(this.toggleSidebarForMe.subscribe());
        // console.log(sidebar)
      }


   
    

    openSnackBar() {
      this._snackBar.open('Abriendo menu', 'Aceptar', {
        horizontalPosition: 'center',
        verticalPosition: "bottom",
      });
    }

    cerrarSesion(){
      Swal.fire("cerrando sesion")
      // Swal.close();
       localStorage.setItem("sucursalIngresa","");
       localStorage.setItem("roles","");
       localStorage.setItem("currentUser","");
       localStorage.clear()
      this.router.navigate(["/login"]);
    }

}
