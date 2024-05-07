import { Component } from '@angular/core';

interface SidenavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'administrador-frontend';

  isSideNavCollapsed=false;
  screenWidth=0;
  
  onToggleSideNav(data:SidenavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }

}
