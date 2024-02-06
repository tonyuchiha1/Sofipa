import { NavItem } from './../../../administracion/servicios/navitem';
import { Component, Output, EventEmitter, OnInit, ViewChild, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from 'src/app/administracion/servicios';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isActive: boolean | undefined;
  collapsed!: boolean;
  showMenu!: string;
  pushRightClass!: string;

  habilitar: boolean = true;
  r: boolean = false;
  s: boolean = true;
  permisosAlta = false
  bajaitem!: NavItem
  menu: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'desktop_windows',
      route: '/layout/dashboard',
    }
  ];
  mobileQuery!: MediaQueryList;
  perfil: any;
  idRegion: any
  idSucursal: any
  username = '';
  idEmpleado: any;
  flag = false;
  @ViewChild("page")
  page!: ElementRef;
  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(
    public router: Router,
    private renderer: Renderer2,
    private userService: UsuarioService,
  ) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    /** valida permisos asignados */
    this.permisos()

    this.menu.push(
      {
        displayName: 'Pro-soft',
        iconName: 'timeline',
        route: '/layout/dashboard'
      },
      {
        displayName: 'Configuración',
        iconName: 'settings',
        route: '/layout/configuracion'
      }
    );


    this.menu.push({
      displayName: 'Acreedor(Responsable)',
      iconName: 'chat_bubble',
      children: [
        {
          displayName: 'Registrar',
          iconName: 'mail_lock',
          route: '/layout/acreedor/registrar',
        },
        {
          displayName: 'Consultar',
          iconName: 'drafts',
          route: '/layout/acreedor/consultar',
        },
      ],
    })

 

    
  }

  mostrarSidebar() {
    if (this.habilitar) {
      this.addMyClass()
    } else {
      this.removeMyClass()
    }
    this.habilitar = (this.habilitar == true) ? false : true;
  }

  addMyClass() {
    this.renderer.addClass(this.page.nativeElement, "toggled");
  }
  removeMyClass() {
    this.renderer.removeClass(this.page.nativeElement, "toggled");
  }
  sidebarDropdown() {
  }
  eventCalled() {
    this.isActive = !this.isActive;
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  toggleCollapsed() {
    this.mostrarSidebar()
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }
  permisos() {
    let roles = JSON.parse(localStorage.getItem('roles')!);
    console.log(roles)
    for (let i = 0; i < roles.roles.length; i++) {
      if (roles.roles[i].nombreTarea == "CALCULADORA") {//nombreTarea
        for (let j = 0; j < roles.roles[i].hijos.length; j++) {
          if (roles.roles[i].hijos[j].url == "altaComponent") {
            this.permisosAlta = true
          }
        }
      }
    }

  }
  autorizacionNuevaConsulta(): boolean {

    return true;

  }
  autorizacionNuevaConsultaIndividual() {
    return true;
  }
  autorizacionMisConsultas(): boolean {
    return true;
  }
  autorizacionSeguimiento(): boolean {
    return true;
  }
  autorizacionReportes(): boolean {
    return false;
  }
  autorizacionReportesIndividual() {
    return true;
  }
  autorizacionExtras(): boolean {
    return true;
  }
  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }
}
