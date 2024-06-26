import { Component, Output, EventEmitter, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { navbarData } from './nav_data';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})

export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  constructor(@Inject(PLATFORM_ID) private platformId: Object ,private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth <= 768) {
        this.collapsed = false;
        this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
      }
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  cerrarSesion() {
    // Eliminar el token JWT almacenado localmente
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}
