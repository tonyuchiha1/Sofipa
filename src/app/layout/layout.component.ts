import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title = 'Administración';
  sideBarOpen = true;

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isOver = false;
  openMenu: any
  bandera: boolean = false
  screenSize: string="";
  sideBarToggler() {
    // console.log("this")
    this.sideBarOpen = !this.sideBarOpen;
    console.log(this.sideBarOpen)
    this.openSnackBar(this.sideBarOpen)
    return this.sideBarOpen
  }
  constructor(private router: Router,private _snackBar: MatSnackBar,
    // private responsiveService: ResponsiveService
    ) { }

  ngOnInit(): void {
    //  this.router.navigate(['layout/home'])

    // this.responsiveService.getScreenSize().subscribe(size => {
    //   this.screenSize = size;
    //   // Realiza acciones específicas según el tamaño de la pantalla
    //   console.log('Tamaño de pantalla:', size);
    // },error=>{
    //   console.log(error)
    // }
    // );

    // Inicializa el tamaño de la pantalla al cargar el componente
   // this.responsiveService.checkScreenSize();
  }

  openSnackBar(flag:boolean ) {
    this._snackBar.open('Menu lateral '+(this,this.sideBarOpen? "abierto":"cerrado"), "Aceptar", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 2500
    });

    
  }
}
