import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    disabled: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '',disabled: false },
    { path: '/evenement', title: 'Evénement',  icon:'event', class: '',disabled: false },
    { path: '/evenement-add', title: 'Ajout événement',  icon:'event', class: '',disabled: true },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '',disabled: false },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '',disabled: false },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '',disabled: false },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '',disabled: false },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '',disabled: false },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '',disabled: false },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro',disabled: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
