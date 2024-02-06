import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Usuario } from '../administracion/modelos';
import { Sucursal } from '../administracion/modelos/sucursal';
import { AuthenticationService, SucursalService, UsuarioService } from '../administracion/servicios';
export interface NombreSucursal {
  name: string | any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl!: string;
  usuario: Usuario = new Usuario();
  error = '';
  sucursal = '';
  sucursales!: Sucursal[];
  hide = true;
  movil = false
  myControl = new UntypedFormControl();
  options: NombreSucursal[] = [];
  filteredOptions: Observable<NombreSucursal[]> | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sucursalService: SucursalService) { }

  ngOnInit() {
    //cierra las ventanas modales de la libreria sweetalert
    Swal.close();
    // reset login status
    //this.authenticationService.logout();
    this.sucursalService.getSucursales().subscribe(val => {
      this.sucursales = val;
      this.sucursales.forEach(element => {

        //   userr.name=element.username
        this.options.push({ name: element.nombreSucursal })

      });

    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
    this.sucursalService.getSucursales().subscribe(val => {
      this.sucursales = val;

    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  displayFn(user: NombreSucursal): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): NombreSucursal[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.loading = true;

    this.authenticationService.login(this.usuario, this.myControl.value.name)
      .pipe(first())
      .subscribe(
        data => {
          let roles = JSON.parse(localStorage.getItem('roles')!);

          let bandera = false;
          for (let i = 0; i < roles.roles.length; i++) {

            if (roles.roles[i].nombreTarea == "CALCULADORA DE CUOTAS") {
              localStorage.setItem('sucursalIngresa', JSON.stringify(roles.roles[i].sucursalIngresa))
              localStorage.setItem('selr', JSON.stringify(roles.roles[i]))
              bandera = true;
            }
          }

          if (bandera) {
            this.router.navigate(['/layout/']);
          } else {
            Swal.fire('Atencion', "¡No tienes acceso al sistema!\nPonte en contacto con TI.", "warning")
            this.loading = false;
            localStorage.clear();
          }


        },
        error => {
          Swal.fire('Atencion', "¡No tienes permisos en esta sucursal!\nPonte en contacto con TI.", "warning")
          this.loading = false;
        });
  }
}
